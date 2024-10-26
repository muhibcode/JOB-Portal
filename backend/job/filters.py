from django.db.models import Q
from django_filters import rest_framework as filters

from .models import Job


class JobsFilters(filters.FilterSet):
    min_salary = filters.NumberFilter(
        field_name='salary' or 0, lookup_expr='gte')
    max_salary = filters.NumberFilter(
        field_name='salary' or 1000000, lookup_expr='lte')
    location = filters.CharFilter(
        field_name='address', lookup_expr='icontains')

    # q = filters.CharFilter(method='my_custom_filter', label='Search')
    keyword = filters.CharFilter(
        field_name='title', lookup_expr='icontains')

    class Meta:
        model = Job
        fields = ('education', 'jobType', 'keyword', 'location',
                  'experience', 'min_salary', 'max_salary')

    # def my_custom_filter(self, queryset, name, value):
    #     return queryset.filter(
    #         Q(title__icontains=value) | Q(description__icontains=value)
    #     )

# from django.db.models import Q
# import django_filters


# class LocationFilter(django_filters.FilterSet):
#     q = django_filters.CharFilter(method='my_custom_filter', label="Search")

#     class Meta:
#         model = Location
#         fields = ['q']

#     def my_custom_filter(self, queryset, name, value):
#         return queryset.filter(
#             Q(loc__icontains=value) | Q(loc_mansioned__icontains=value) | Q(loc_country__icontains=value) | Q(loc_modern__icontains=value)
#         )
