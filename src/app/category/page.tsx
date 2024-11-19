
import React from 'react';

const categories = [
    { name: 'Desserts', types: ['Cakes', 'Cookies', 'Pies'] },
    { name: 'Main Courses', types: ['Pasta', 'Pizza', 'Burgers'] },
    { name: 'Appetizers', types: ['Salads', 'Soups', 'Dips'] }
];

const styles = {
    page: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f8f9fa'
    },
    title: {
        textAlign: 'center' as React.CSSProperties['textAlign'],
        color: '#343a40',
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    category: {
        margin: '20px 0',
        padding: '10px',
        border: '1px solid #dee2e6',
        borderRadius: '5px',
        backgroundColor: '#ffffff'
    },
    categoryName: {
        fontSize: '1.5em',
        color: '#495057'
    },
    categoryTypes: {
        listStyleType: 'none',
        padding: '0'
    },
    categoryType: {
        padding: '5px 0',
        color: '#6c757d'
    }
};

export default function CategoryPage() {
    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Categories</h1>
            {categories.map((category, index) => (
                <div key={index} style={styles.category}>
                    <h2 style={styles.categoryName}>{category.name}</h2>
                    <ul style={styles.categoryTypes}>
                        {category.types.map((type, typeIndex) => (
                            <li key={typeIndex} style={styles.categoryType}>{type}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}