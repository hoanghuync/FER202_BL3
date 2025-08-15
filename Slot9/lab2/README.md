# Movie Explorer - Lab2

Ứng dụng React để khám phá và quản lý phim yêu thích.

## Tính năng

### 1. Trang chủ & Navbar
- **Navbar cố định:** Hiển thị brand "Movie Explorer" và 3 link điều hướng
- **Free Movies:** Trang danh sách phim (mặc định)
- **My Favourite Movies:** Trang danh sách phim yêu thích
- **Movie Request Form:** Trang form yêu cầu thêm phim
- **Active state:** Highlight trang đang xem

### 2. Carousel (Hero)
- **3 slides:** Hiển thị 3 phim nổi bật
- **Caption:** Title + description ngắn
- **Auto-play:** Chuyển slide tự động mỗi 5 giây
- **Controls:** Mũi tên điều khiển và indicators
- **Responsive:** Tự động điều chỉnh trên mobile

### 3. Danh sách Movies dạng Card Grid
- **Responsive grid:** 1-2-3 cột tùy theo màn hình
- **Card info:** Poster, title, description (rút gọn), year, country, duration, genre
- **Genre badge:** Hiển thị genre bằng Badge
- **Add to Favourites:** Toggle thêm/xóa khỏi favourites
- **Details:** Mở Modal xem chi tiết với showtimes
- **Hover effects:** Animation đẹp mắt

### 4. Phân loại theo Genre
- **Genre filter:** Dropdown chọn genre (mặc định "All")
- **Real-time update:** Danh sách cập nhật ngay lập tức
- **Result count:** Hiển thị số lượng kết quả

### 5. Tìm kiếm theo tên
- **Search input:** Tìm kiếm theo title và description
- **Case-insensitive:** Không phân biệt hoa thường
- **No results:** Hiển thị Alert "No movies found"

### 6. Sắp xếp theo thời lượng
- **Sort options:** None, Duration ↑, Duration ↓, Title A-Z, Title Z-A, Year
- **Apply on filtered:** Chỉ sắp xếp trên kết quả đã filter

### 7. Favourites & Toast
- **Toggle functionality:** Thêm/xóa khỏi favourites
- **Toast notification:** "Added to favourites!" / "Removed from favourites!"
- **LocalStorage:** Lưu trữ favourites, persist sau khi refresh
- **Favourites page:** Hiển thị grid phim yêu thích
- **Empty state:** Alert "No favourites yet." nếu rỗng

### 8. Movie Request Form + PropTypes
- **Form fields:** Title, genre, year, duration, description
- **Client-side validation:**
  - Title: Required, min 2 characters
  - Genre: Required selection
  - Year: Required, 1900-current+5
  - Duration: Required, 1-300 minutes
  - Description: Required, min 30 characters
- **Error display:** Highlight control + message dưới control
- **Success feedback:** Alert "Request submitted. Thank you!"
- **PropTypes:** Validate props cho MovieCard và SearchFilterBar

## Cài đặt

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy ứng dụng:**
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Cấu trúc dự án

```
src/
├── components/
│   ├── Navbar.js              # Navigation bar
│   ├── HeroCarousel.js        # Carousel slides
│   ├── MovieCard.js           # Movie card component
│   ├── SearchFilterBar.js     # Search & filter controls
│   ├── MovieModal.js          # Movie details modal
│   └── MovieRequestForm.js    # Request form
├── data/
│   └── movies.js              # Movie data
├── App.js                     # Main component
└── App.css                    # Styling
```

## Công nghệ sử dụng

- **React 18.2.0**
- **React Bootstrap 2.10.0**
- **React Icons 4.12.0**
- **PropTypes 15.8.1**
- **Bootstrap 5.3.2**
- **LocalStorage** cho favourites
- **useMemo** cho performance optimization
- **useState, useEffect** cho state management

## Tính năng kỹ thuật

### State Management
- **useState:** Quản lý local state
- **useEffect:** Side effects (localStorage, data loading)
- **useMemo:** Tối ưu performance cho filter/sort

### Component Architecture
- **Modular design:** Tách biệt các component
- **Props validation:** Sử dụng PropTypes
- **Reusable components:** MovieCard, SearchFilterBar

### Data Flow
- **Top-down:** Props từ App xuống components
- **Event handling:** Callbacks từ components lên App
- **LocalStorage:** Persistent state cho favourites

### Responsive Design
- **Bootstrap Grid:** 1-2-3 cột responsive
- **Mobile-first:** Tối ưu cho mobile
- **Flexible layout:** Tự động điều chỉnh

## Troubleshooting

Nếu gặp lỗi "Module not found", hãy:

1. Xóa thư mục `node_modules` và `package-lock.json`
2. Chạy lại `npm install`
3. Khởi động lại ứng dụng với `npm start`
