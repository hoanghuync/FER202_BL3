# Exercise 2 - Person Management System

A React application that demonstrates various JavaScript array methods including `filter`, `reduce`, and `destructuring` to manage and display person data.

## Features

### 1. Person List with Sorting
- Displays a list of persons with their full name, age, city, and skills
- Sort button to toggle between A→Z and Z→A sorting by first name
- Clean, modern interface with hover effects

### 2. Filter by Age Range and Skill
- Two text inputs for minimum and maximum age filtering
- Dropdown to filter by specific skills
- Uses `filter` method to apply multiple criteria
- Shows "No found" message when no results match
- Results displayed as: First Name - Last Name - Skills

### 3. Skill Ranking Table
- Uses `reduce` method to count frequency of each skill
- Displays skills in a table format with counts
- Top-ranked skill is highlighted in bold
- Sorted by frequency (highest to lowest)

### 4. Search and Multi-criteria Sort
- Text search that filters by full name (firstName + lastName)
- Multi-criteria sorting with priorities:
  1. `isActive` (true first)
  2. Age (ascending)
  3. Last name (A→Z)
- Statistics box showing:
  - Total number of people
  - Average age
  - Number of active people
- Uses `reduce` for statistical calculations

## Technical Implementation

### Array Methods Used
- **`filter()`**: For age range and skill filtering, name search
- **`reduce()`**: For skill counting, statistics calculation
- **`map()`**: For transforming data structures
- **`sort()`**: For various sorting operations
- **Destructuring**: Used throughout the code for cleaner data access

### React Hooks
- **`useState`**: For managing component state
- **`useMemo`**: For performance optimization of computed values

### Component Architecture
The application is built using a modular component structure:

- **`PersonList`**: Handles display and sorting of person list
- **`PersonFilter`**: Manages age and skill filtering
- **`SkillRanking`**: Displays skill frequency ranking
- **`PersonSearch`**: Handles search and multi-criteria sorting with statistics

### Data Structure
```javascript
{
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  city: string,
  skills: string[],
  isActive: boolean
}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── App.js                    # Main application component
├── App.css                   # Application styles
├── person.js                 # Person data
├── index.js                  # Application entry point
├── index.css                 # Global styles
└── components/               # Modular components
    ├── PersonList.js         # Person list and sorting
    ├── PersonFilter.js       # Age and skill filtering
    ├── SkillRanking.js       # Skill frequency ranking
    └── PersonSearch.js       # Search and statistics
```

## Sample Data

The application includes 5 sample persons with various skills:
- React, Node, Vue, CSS, Go, Angular, RxJS, SQL

## Features Demonstrated

- ✅ List display with sorting
- ✅ Age and skill filtering using `filter`
- ✅ Skill ranking using `reduce`
- ✅ Multi-criteria search and sorting
- ✅ Statistics calculation using `reduce`
- ✅ Modern, responsive UI design
- ✅ Destructuring throughout the codebase
- ✅ Modular component architecture
- ✅ Clean separation of concerns

## Technologies Used

- React 19.1.1
- JavaScript ES6+
- CSS3 with modern features
- HTML5
