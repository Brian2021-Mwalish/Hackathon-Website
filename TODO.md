# TODO: Update AdminDashboard User Management

## Backend Changes
- [x] Add UserSerializer in bitsa-backend/accounts/serializers.py for listing and updating users
- [x] Add user management views in bitsa-backend/accounts/views.py:
  - get_users: List all users
  - add_user: Create new user (reuse register logic)
  - toggle_user_block: Block/unblock user by setting is_active
- [x] Update bitsa-backend/accounts/urls.py to include new user management endpoints
- [x] Ensure views require admin permissions (is_staff)

## Frontend Changes
- [x] Update src/pages/AdminDashboard.tsx:
  - Add state for users list
  - Fetch users on component mount
  - Display users in a table with columns: Name, Email, Role, Status, Actions
  - Add "Add User" button to open a dialog/form
  - Add block/unblock buttons for each user
  - Handle API calls for add, block/unblock with error handling
- [x] Add necessary UI components if needed (e.g., table, dialog for add user)

## Testing
- [ ] Test backend APIs with Postman or similar
- [ ] Test frontend functionality in browser
- [ ] Ensure only admins can access user management
