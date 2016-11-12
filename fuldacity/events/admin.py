from django.contrib import admin

from .models import Event

class EventAdmin(admin.ModelAdmin):
    exclude = ('author',)
    list_display = ('name', 'author', 'pub_date')

    def save_model(self, request, obj, form, change):
        if not change:
            obj.author = request.user
        obj.save()

    def get_queryset(self, request):
        if request.user.is_superuser:
            print("is superuser")
            return Event.objects.all()
        else:
            print("is shitty user")
            return Event.objects.filter(author=request.user)

    def has_change_permission(self, request, obj=None):
        has_class_permission = super(EventAdmin, self).has_change_permission(request, obj)
        if not has_class_permission:
            return False
        if obj is not None and not request.user.is_superuser and request.user.id != obj.author.id:
            return False
        return True

admin.site.register(Event, EventAdmin)
