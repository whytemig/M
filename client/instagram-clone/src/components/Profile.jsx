import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";;
import Layout from "./Layout";


const Profile = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [profiles, setProfiles] = useState([]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const fetchProfiles = async () => {
        try {
            const response = await fetch(`/searchProfiles?term=${searchTerm}`);
            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    // Fetch profiles when the search term changes
    useEffect(() => {
        fetchProfiles();
    }, [searchTerm]);

    return (
      

        <div className="max-w-md mx-auto bg-white p-4 shadow-md rounded-lg">
            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>

            {/* Search results */}
            <div>
                {profiles.map(profile => (
                    <div key={profile._id} className="flex items-center mb-3">
                        <img src={profile.avatarUrl} alt="Profile Avatar" className="w-10 h-10 rounded-full" />
                        <div className="ml-4">
                            <p className="font-semibold">{profile.username}</p>
                            <p className="text-gray-500">{profile.fullName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>,
        <Outlet/>
    );
};

export default Profile;
