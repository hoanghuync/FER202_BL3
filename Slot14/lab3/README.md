# Lab 3: Student Management System với Profile Builder Wizard

## 📋 **Mô tả dự án**

Dự án này kết hợp **Student Management System** với **Profile Builder Wizard** - một ứng dụng đa bước cho phép người dùng tạo profile hoàn chỉnh thông qua 3 tabs: About, Account, và Address.

## 🎯 **Tính năng chính**

### **✅ Student Management System**
- **Quản lý sinh viên**: Hiển thị danh sách 10 sinh viên với thông tin chi tiết
- **Tìm kiếm & Lọc**: Tìm kiếm theo tên/email, lọc theo tuổi và avatar
- **Sắp xếp**: Sắp xếp theo tuổi (tăng/giảm) và tên (A-Z/Z-A)
- **Responsive Design**: Giao diện thích ứng trên mọi thiết bị

### **✅ Profile Builder Wizard**
- **3-Tab Wizard**: About → Account → Address
- **Validation Real-time**: Kiểm tra tính hợp lệ của từng tab
- **Progress Tracking**: Hiển thị tiến độ hoàn thành
- **Form Validation**: Validation nghiêm ngặt cho từng field
- **Profile Summary**: Modal hiển thị tổng kết thông tin

## 🛠 **Công nghệ sử dụng**

- **React 19.1.1** - UI Library
- **React Bootstrap 2.10.10** - UI Components
- **Bootstrap 5.3.7** - CSS Framework
- **React Icons 4.12.0** - Icon library
- **PropTypes 15.8.1** - Runtime type checking

## 🚀 **React Hooks được sử dụng**

### **1. useState**
- Quản lý state của form, modal, và navigation
- State cho từng tab và validation

### **2. useEffect**
- Theo dõi thay đổi của form data
- Validation real-time

### **3. useReducer**
- Quản lý state phức tạp của form đa bước
- Actions: UPDATE_FIELD, UPDATE_AVATAR, RESET_FORM

### **4. useMemo**
- Tính toán `isStepValid` cho từng tab
- Tính toán phần trăm tiến độ hoàn thành
- Tối ưu performance cho validation

### **5. useCallback**
- Tối ưu performance cho event handlers
- `nextStep`, `prevStep`, `onFieldChange`, `onFileChange`

## 🎨 **UI Components**

### **React Bootstrap Components**
- **Form**: Form.Group, Form.Control, Form.Select, Form.Check
- **Button**: Primary, outline, disabled states
- **ProgressBar**: Hiển thị tiến độ wizard
- **Nav**: Tab navigation
- **Card**: Profile display và form sections
- **Alert/Toast**: Thông báo thành công
- **Modal**: Profile builder và summary

### **Custom Components**
- **NavigationBar**: Navbar với link "Build your Profile"
- **Hero**: Hero section với thông tin hệ thống
- **Filters**: Search và filter controls
- **SortDropdown**: Sorting options
- **StudentCard**: Card hiển thị thông tin sinh viên
- **StudentGrid**: Grid layout cho danh sách sinh viên
- **StudentDetailModal**: Modal chi tiết sinh viên

## 📁 **Cấu trúc dự án**

```
src/
├── components/
│   ├── Navbar.js                    # Navigation bar
│   ├── Hero.js                      # Hero section
│   ├── Filters.js                   # Search & filter controls
│   ├── SortDropdown.js              # Sorting options
│   ├── StudentCard.js               # Individual student card
│   ├── StudentGrid.js               # Student list grid
│   ├── StudentDetailModal.js        # Student detail modal
│   ├── StudentsPage.js              # Main students page
│   ├── Footer.js                    # Application footer
│   ├── ProfileBuilderModal.js       # Main wizard modal
│   └── wizard/                      # Wizard components
│       ├── AboutTab.js              # About tab (personal info)
│       ├── AccountTab.js            # Account tab (security)
│       ├── AddressTab.js            # Address tab (location)
│       └── ProfileSummaryModal.js   # Profile summary
├── data/
│   └── students.js                  # Student data
├── App.js                           # Main application
├── App.css                          # Application styling
├── index.js                         # Entry point
└── index.css                        # Global styling
```

## 🔧 **Validation Rules**

### **About Tab**
- First Name: Required
- Last Name: Required
- Email: Required, valid format
- Phone: Required
- Date of Birth: Required
- Gender: Required
- Bio: Optional

### **Account Tab**
- Username: Required, minimum 6 characters
- Password: Required, minimum 8 characters, uppercase, number, special character
- Confirm Password: Required, must match password
- Secret Question: Required
- Secret Answer: Required

### **Address Tab**
- Street: Required
- City: Required
- State/Province: Required
- Country: Required (dropdown)
- ZIP/Postal Code: Required

## 🎯 **Tính năng đặc biệt**

### **1. Progressive Tab Navigation**
- Tab "Account" chỉ mở khi "About" hoàn thành
- Tab "Address" chỉ mở khi "About" và "Account" hoàn thành
- Visual feedback cho trạng thái từng tab

### **2. Real-time Validation**
- Validation ngay khi user nhập
- Visual feedback với colors và icons
- Progress bar hiển thị tiến độ

### **3. Password Security**
- Show/hide password với eye icon
- Password strength requirements
- Real-time validation feedback

### **4. Profile Summary**
- Modal hiển thị tất cả thông tin đã nhập
- Organized sections với color coding
- Success toast notification

## 🚀 **Cài đặt và chạy**

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy dự án:**
   ```bash
   npm start
   ```

3. **Mở trình duyệt:**
   ```
   http://localhost:3000
   ```

## 🎮 **Cách sử dụng**

### **Student Management**
1. Click "Students" trong navbar
2. Sử dụng search và filters
3. Click "View Details" để xem chi tiết sinh viên

### **Profile Builder**
1. Click "Build your Profile" trong navbar
2. Hoàn thành từng tab theo thứ tự:
   - **About**: Thông tin cá nhân
   - **Account**: Thông tin tài khoản
   - **Address**: Thông tin địa chỉ
3. Click "Finish" để hoàn thành
4. Xem profile summary và nhận thông báo thành công

## 📚 **Kiến thức học được**

### **React Hooks**
- **useState**: Quản lý local state
- **useEffect**: Side effects và validation
- **useReducer**: State management phức tạp
- **useMemo**: Performance optimization
- **useCallback**: Function memoization

### **Form Management**
- Multi-step form validation
- Real-time feedback
- Progressive disclosure
- File upload handling

### **Component Architecture**
- Component composition
- Props drilling
- Event handling
- State lifting

### **UI/UX Design**
- Responsive design
- Accessibility
- Visual feedback
- Progressive enhancement

## 🔍 **Mở rộng dự án**

- Thêm database integration
- Implement user authentication
- Add profile editing
- Export profile data
- Add more validation rules
- Implement form persistence
- Add unit tests
- Add E2E tests

## 📝 **Ghi chú**

- Dự án sử dụng Bootstrap 5 cho responsive design
- PropTypes được implement cho tất cả components
- Performance optimization với useMemo và useCallback
- Form validation real-time với visual feedback
- Wizard navigation progressive với validation gates
