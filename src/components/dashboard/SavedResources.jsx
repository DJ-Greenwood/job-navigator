import React from 'react';

const SavedResources = () => {
    const resources = [
        // Sample data for saved resources
        { id: 1, title: 'React Documentation', link: 'https://reactjs.org/docs/getting-started.html' },
        { id: 2, title: 'JavaScript Info', link: 'https://javascript.info/' },
        { id: 3, title: 'CSS Tricks', link: 'https://css-tricks.com/' },
    ];

    return (
        <div>
            <h2>Saved Resources</h2>
            <ul>
                {resources.map(resource => (
                    <li key={resource.id}>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                            {resource.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedResources;