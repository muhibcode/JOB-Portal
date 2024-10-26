
from django.db.models import Avg, Count, Max, Min
from django.shortcuts import get_object_or_404
from genericpath import exists
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .filters import JobsFilters
from .models import CandidatesApplied, Job
from .serializer import CandidatesAppliedSerializer, JobSerializer

# Create your views here.


@api_view(['GET'])
def getAllJobs(request):
    # jobs = Job.objects.all().order_by('id')
    print('page req is ', request.GET['experience'])
    args = {'jobType': request.GET['jobType'],
            'experience': request.GET['experience']}
    jobs = JobsFilters(
        request.GET, queryset=Job.objects.all().order_by('id')).qs
    # if args:
    # jobs = Job.objects.filter().order_by('id')
    count = jobs.count()
    # else:
    #     jobs = Job.objects.all().order_by('id')
    #     count = jobs.count()

    resPerPage = 3
    # if not jobs.is_valid():
    #     raise translate_validation(jobs.errors)
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage
    queryset = paginator.paginate_queryset(jobs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response({'count': count, 'resPerPage': resPerPage, 'jobs': serializer.data})


@api_view(['GET'])
def getJob(request, id):
    job = get_object_or_404(Job, pk=id)
    serialzer = JobSerializer(job)
    candidates = CandidatesApplied.objects.filter(job=job).count()

    return Response({'job': serialzer.data, 'candidates': candidates})


@api_view(['GET'])
def statsJob(request, topic):
    # jobs = JobsFilters(request.GET, queryset=Job.objects.all().order_by('id'))

    # args = {'title__icontains': topic}
    # jobs = Job.objects.filter(**args)

    jobs = Job.objects.filter(title__icontains=topic)
    if len(jobs) == 0:
        return Response({'message': 'No job found for ' + topic})
       # return Response({'message': 'No job found for {topic}'.format(topic=topic)})
    # serialzer = JobSerializer(*jobs)
    print(len(jobs))

    stats = jobs.aggregate(
        total_positions=Count('title'),
        average_salary=Avg('salary'),
        max_salary=Max('salary'),
        min_salary=Min('salary')
    )
    return Response({'stats': stats})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateJob(request, id):
    job = get_object_or_404(Job, pk=id)
    serialzer = JobSerializer(job, data=request.data)
    serialzer.is_valid(raise_exception=True)
    serialzer.save()
    return Response(serialzer.data)


# @api_view(['PUT'])
# def updateJob(request, id):
#     job = get_object_or_404(Job, pk=id)
#     serialzer = JobSerializer(job, data=request.data)
#     serialzer.is_valid(raise_exception=True)
#     serialzer.save()
#     return Response(serialzer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_new(request):
    request.data['user'] = request.user
    data = request.data
    print(data)
    job = Job.objects.create(**data)
    serialzer = JobSerializer(job)
    # serialzer.is_valid(raise_exception=True)
    # serialzer.save()
    return Response(serialzer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def appliedForJob(request, id):
    user = request.user

    job = get_object_or_404(Job, pk=id)
    # alreadyApplied = CandidatesApplied.objects.filter(user=user).exists()
    alreadyApplied = job.candidateApplied.filter(user=user).exists()
    # print('ans is', job)

    jobApplied = CandidatesApplied.objects.create(
        job=job,
        user=user,
        resume=''
    )

    return Response({
        'applied': True,
        'job_Id': jobApplied.id
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUserJobs(request):
    user = request.user
    jobs = Job.objects.filter(user=user.id)
    serializer = JobSerializer(jobs)

    # alreadyApplied = job.candidateApplied.filter(user=user).exists()

    return Response('serializer.data')


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def currentUserAppliedJobs(request):
    user = request.user
    args = {'user_id': request.user.id}
    jobsApplied = CandidatesApplied.objects.filter(user=user)
    # jobsApplied = CandidatesApplied.objects.all()

    serializer = CandidatesAppliedSerializer(jobsApplied)
    # alreadyApplied = job.candidateApplied.filter(user=user).exists()
    print(jobsApplied)
    return Response({'jobsapplied': serializer.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def creatingIsApplied(request, id):
    user = request.user
    job = get_object_or_404(Job, pk=id)

    applied = job.candidateApplied.filter(user=user).exists()

    return Response({'applied': applied})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def candidatesList(request, id):
    user = request.user

    job = get_object_or_404(Job, pk=id)
    if job.user != user:
        return Response('You are not allowed to see')
    candidates = job.candidateApplied.all()

    return Response('candidates')
