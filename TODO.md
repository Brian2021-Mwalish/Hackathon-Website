# Update to Allow Superusers to Access Admin Dashboard

## Backend Changes 
- [x] Update UserSerializer to include `is_superuser` field
- [x] Update login view to return `is_superuser` in response
- [x] Update register view to return `is_superuser` in response
- [x] Update CustomTokenObtainPairSerializer to include `is_superuser` in response

## Frontend Changes
- [x] Update User interface in types to include `is_superuser`
- [x] Update AuthContext to handle `is_superuser` in user objects
- [x] Update LoginPage navigation condition to include superusers
- [x] Update AdminDashboard access condition to include superusers

## Testing
- [ ] Test login with superuser account
- [ ] Verify admin dashboard access for superusers
