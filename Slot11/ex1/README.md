# Exercise 1: Sử dụng useState

## Mô tả dự án
Dự án này thực hiện yêu cầu tạo một component ProfileForm sử dụng React hooks `useState` để quản lý state và validation form.

## Tính năng chính

### 1. Form với 3 trường input:
- **Name**: Text input, không được rỗng
- **Email**: Email input, phải chứa ký tự "@"
- **Age**: Number input, giá trị tối thiểu là 1

### 2. Validation:
- Hiển thị lỗi validation dưới mỗi trường
- Submit button chỉ enable khi form hợp lệ
- Sử dụng `isInvalid` và `Form.Control.Feedback` của React-Bootstrap

### 3. State Management:
- Sử dụng `useState` cho mỗi biến: `name`, `email`, `age`
- State `showToast` và `setShowToast` để xử lý Toast message
- State `errors` để quản lý validation errors
- State `showModal` và `submittedData` để hiển thị modal thành công

### 4. Submit Button:
- Chỉ enable khi form hợp lệ
- Khi click sẽ:
  - Hiển thị Toast "Submitted successfully!"
  - Không reload trang (sử dụng `e.preventDefault()`)
  - Hiển thị modal với thông tin đã submit

### 5. PropTypes:
- Validate prop `onSubmit` là function bắt buộc

## Cấu trúc dự án

```
Slot11/ex1/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── ProfileForm.js      # Component chính
│   ├── App.js                  # App component
│   ├── App.css                 # Styles cho App
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
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
- `react-bootstrap`: ^2.10.1
- `bootstrap`: ^5.3.2
- `prop-types`: ^15.8.1
- `react-icons`: ^4.12.0

## Cách hoạt động

1. **Form Input**: Người dùng nhập thông tin vào 3 trường
2. **Real-time Validation**: Form kiểm tra tính hợp lệ theo thời gian thực
3. **Submit Button**: Chỉ enable khi tất cả trường đều hợp lệ
4. **Form Submission**: Khi submit thành công:
   - Hiển thị Toast message
   - Mở modal hiển thị thông tin đã submit
   - Reset form về trạng thái ban đầu
5. **Error Handling**: Hiển thị lỗi validation dưới mỗi trường không hợp lệ

## Kỹ thuật sử dụng

- **React Hooks**: `useState` để quản lý state
- **React-Bootstrap**: Components UI (Form, Button, Toast, Modal, Card)
- **PropTypes**: Validation props
- **Event Handling**: `onSubmit`, `onChange`
- **Conditional Rendering**: Hiển thị errors và enable/disable button
- **Form Validation**: Client-side validation với feedback trực quan
