# TODO: Add Edit Functionality to AdminDashboard Gallery

## Tasks
- [ ] Add edit button (pencil icon) next to delete button on photo cards
- [ ] Add state variables: editDialogOpen (boolean), selectedPhoto (Photo | null)
- [ ] Implement editPhoto function to send PATCH request for updating photos
- [ ] Create edit dialog with pre-filled form fields (title, description, optional image)
- [ ] Handle opening edit dialog with selected photo data
- [ ] Test edit functionality in the UI
- [ ] Verify backend permissions work correctly (admin can edit any, users only own)
