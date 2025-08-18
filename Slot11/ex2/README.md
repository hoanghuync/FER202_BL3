# Exercise 2: Student Management System

## Mô tả dự án
Dự án này thực hiện yêu cầu xây dựng trang web đơn giản hiển thị danh sách sinh viên với đầy đủ tính năng filter, sort và responsive design.

## Tính năng chính

### 1. Giao diện:
- **Navbar**: Chứa links (Home, Students, About) và ô Quick search
- **Hero**: Tiêu đề "Student Management" + mô tả ngắn
- **Footer**: Thông tin dự án và credits

### 2. Filter:
- **Search by name/email**: Tìm kiếm theo tên hoặc email
- **Age range**: 3 lựa chọn (≤20, 21-25, >25)
- **Has avatar**: Checkbox chỉ hiển thị sinh viên có ảnh

### 3. Sorting:
- **Tuổi**: Tăng dần, giảm dần
- **Tên**: A→Z, Z→A

### 4. StudentGrid (Cards):
- **Responsive**: 3 cột desktop, 2 tablet, 1 mobile
- **Mỗi Card hiển thị**: ID, avatar, name, email, age
- **Nút View Details**: Mở modal chi tiết

### 5. Components được tách riêng:
- `StudentsPage`: Quản lý state và logic chính
- `Filters`: Bộ lọc tìm kiếm
- `SortDropdown`: Dropdown sắp xếp
- `StudentGrid`: Grid hiển thị sinh viên
- `StudentCard`: Card từng sinh viên
- `StudentDetailModal`: Modal chi tiết
- `Navbar`: Thanh điều hướng
- `Footer`: Chân trang

## Cấu trúc dự án

```
Slot11/ex2/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── StudentsPage.js      # Component chính quản lý state
│   │   ├── Filters.js           # Bộ lọc tìm kiếm
│   │   ├── SortDropdown.js      # Dropdown sắp xếp
│   │   ├── StudentGrid.js       # Grid hiển thị sinh viên
│   │   ├── StudentCard.js       # Card từng sinh viên
│   │   ├── StudentDetailModal.js # Modal chi tiết
│   │   ├── Navbar.js            # Thanh điều hướng
│   │   ├── Hero.js              # Hero section
│   │   └── Footer.js            # Chân trang
│   ├── data/
│   │   └── students.js          # Dữ liệu 10 sinh viên
│   ├── App.js                   # App component chính
│   ├── App.css                  # Styles cho App
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles
├── package.json
└── README.md
```

## Dữ liệu mẫu

Dự án sử dụng 10 sinh viên mẫu với cấu trúc:
```javascript
{
  id: number,
  name: string,
  email: string,
  age: number,
  avatar: string
}
```

## Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy dự án:
```bash
npm start
```

3. Mở trình duyệt tại: `http://localhost:3000`

## Dependencies

- `react`: ^19.1.1
- `react-dom`: ^19.1.1
- `react-bootstrap`: ^2.10.10
- `bootstrap`: ^5.3.7
- `prop-types`: ^15.8.1
- `react-icons`: ^4.12.0

## Yêu cầu kỹ thuật đã đáp ứng

### ✅ React Hooks:
- **useState**: Quản lý state cho search, filter, sort, modal
- **useMemo**: Tối ưu performance cho filter và sort

### ✅ PropTypes:
- Validate shape của StudentCard component
- Validate tất cả props cần thiết

### ✅ Responsive Design:
- **Desktop**: 3 cột (lg={4})
- **Tablet**: 2 cột (md={6})
- **Mobile**: 1 cột (mặc định)

### ✅ Component Architecture:
- Tách biệt rõ ràng các chức năng
- Props validation đầy đủ
- Reusable components

## Cách hoạt động

1. **Homepage**: Hiển thị Hero section và giới thiệu
2. **Students Page**: 
   - Filters: Search, age range, has avatar
   - Sort: Theo tuổi hoặc tên
   - Grid: Hiển thị cards sinh viên
3. **Student Details**: Click "View Details" mở modal
4. **Navigation**: Chuyển đổi giữa các trang
5. **Search**: Quick search từ navbar

## Tính năng nâng cao

- **Real-time filtering**: Cập nhật ngay lập tức khi thay đổi filter
- **Performance optimization**: useMemo cho filter/sort
- **Error handling**: Fallback images cho avatar
- **Smooth animations**: Hover effects và transitions
- **Accessibility**: ARIA labels và semantic HTML
