import React from "react";
import './App.css'

const Footer = () => {
    return (
        <footer class="custom-color d-flex flex-wrap justify-content-between align-items-center pt-1 mt-5 border-top position-static fixed-bottom">
            <p class="col-md-4 mt-0">©2023 Sports Matchup</p>
            <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"/>

            <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item">
                    <a class="nav-link px-2" aria-current="page" href="/home#discover-events">Discover</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-2" aria-current="page" href="/create-edit-events">Create/Edit</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-2" aria-current="page" href="/my-events">My Events</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-2" aria-current="page" href="/profile">Profile</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;