let todayBox;
let currentEvent;
let userData;
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];
const now = new Date();
const todayDate = now.getDate();
const startPosition = now.getMonth();
let currentMonth = now.getMonth();
const startYear = now.getFullYear().toString();
let currentYear = now.getFullYear().toString();


function createHtml(){
    let menu = document.createElement("div");
    menu.classList.add("menu-container");
    if(document.querySelector(".home")){
        menu.innerHTML = `
            <div class="menu-header">
                <img src="images/logo.png" class="menu-logo" />

                <div class="menu-icon" onclick="closeMenu()">
                    <i class="fa-solid fa-x menu-x"></i>
                </div>
            </div>

            <div class="menu-label">Browse Our Pages</div>
            <div class="menu-nav">
                <a onclick="closeMenu()" href="#home" class="menu-link">Home</a>
                <a onclick="closeMenu()" href="#about" class="menu-link">About us</a>
                <a onclick="closeMenu()" href="#gallery" class="menu-link" style="display: none;" >Gallery</a>    
                <div onclick="closeMenu(); applyToggle()" class="menu-link">Apply</div>   
                <div onclick="closeMenu(); loginToggle()" class="menu-link">Login</div>   
                <a onclick="closeMenu()" href="#contact" class="menu-link">Contact</a>
            </div>

            <div class="menu-social">
                <a href="https://www.instagram.com/" target="_blank" class="menu-social-wrapper"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="menu-social-wrapper" target="_blank"><i class="fa-solid fa-phone"></i></a>
                <a href="#" target="_blank" class="menu-social-wrapper"><i class="fa-solid fa-envelope"></i></a>
            </div>
            <div class="menu-copy">© 2025, Club729. All rights reserved.</div>
        `;

        document.querySelector(".header").innerHTML = `
            <img src="images/logo.png" class="header-logo" onclick="window.location.href = '/'" />
            
            <div class="header-nav">
                <a href="#home" class="header-link">Home</a>
                <a href="#about" class="header-link">About us</a>
                <a href="#gallery" class="header-link" style="display: none;" >Gallery</a>    
                <div onclick="applyToggle()" class="header-link">Apply</div>   
                <div onclick="loginToggle()" class="header-link">Login</div>   
                <a href="#contact" class="header-link">Contact</a>
            </div>

            <div class="header-menu" onclick="openMenu()">
                <div class="menu-line line1"></div>
                <div class="menu-line line2"></div>
                <div class="menu-line line3"></div>
            </div>
        `;
    } else {
        menu.innerHTML = `
            <div class="menu-header">
                <img src="images/logo.png" class="menu-logo" />

                <div class="menu-icon" onclick="closeMenu()">
                    <i class="fa-solid fa-x menu-x"></i>
                </div>
            </div>

            <div class="menu-label">Browse Our Pages</div>
            <div class="menu-nav">
                <a onclick="closeMenu()" href="/welcome.html" class="menu-link">Home</a>
                <a onclick="closeMenu()" href="dashboard.html" class="menu-link">Calendar</a>
                <a onclick="closeMenu()" href="gallery.html" class="menu-link" style="display: none;" >Gallery</a>   
                <a onclick="closeMenu()" href="training.html" class="menu-link">Training</a>   
                <div onclick="closeMenu(); createChat()" class="menu-link">Chat</div>   
                <div onclick="closeMenu(); createProfile()" class="menu-link">Edit Profile</div>
                <div onclick="closeMenu(); createAnc()" class="menu-link">Announcements</div>
                <div onclick="closeMenu(); createAdminPannel()" class="header-link admin-element">Admin</div>
            </div>

            <div class="menu-social">
                <a href="https://www.instagram.com/" target="_blank" class="menu-social-wrapper"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="menu-social-wrapper" target="_blank"><i class="fa-solid fa-phone"></i></a>
                <a href="#" target="_blank" class="menu-social-wrapper"><i class="fa-solid fa-envelope"></i></a>
            </div>
            <div class="menu-copy">© 2025, Club729. All rights reserved.</div>
        `;

        document.querySelector(".header").innerHTML = `
            <img src="images/logo.png" class="header-logo" onclick="window.location.href = '/'" />
            
            <div class="header-nav">
                <a href="/welcome.html" class="header-link">Home</a>
                <a href="dashboard.html" class="header-link">Calendar</a>
                <a href="gallery.html" class="header-link" style="display: none;" >Gallery</a>    
                <a href="training.html" class="header-link">Training</a>   
                <div onclick="createChat()" class="header-link">Chat</div>   
                <div onclick="createAnc()" class="header-link">Announcements</div>
                <div onclick="createProfile()" class="header-link">Edit Profile</div>
                <div onclick="createAdminPannel()" class="header-link admin-element">Admin</div>
            </div>

            <div class="header-menu" onclick="openMenu()">
                <div class="menu-line line1"></div>
                <div class="menu-line line2"></div>
                <div class="menu-line line3"></div>
            </div>
        `;
    }
    document.body.prepend(menu);

    let footer = document.createElement("div");
    footer.classList.add("foot-container");
    footer.classList.add("width");
    footer.innerHTML = `
        <div class="foot-flex">
            <div class="foot-content">
                <img src="images/logo.png" class="foot-img" />
                <div class="foot-social">
                    <a class="foot-social-icon" href="https://instagram.com"><i class="fa-brands fa-instagram foot-social-icon"></i></a>
                    <a class="foot-social-icon" href="https://linkedin.com"><i class="fa-brands fa-twitter foot-social-icon"></i></a>
                    <a class="foot-social-icon" href="https://linkedin.com"><i class="fa-brands fa-linkedin-in foot-social-icon"></i></a>
                    <a class="foot-social-icon" href="https://telegram.com"><i class="fa-brands fa-telegram foot-social-icon"></i></a>
                </div>
            </div>
            <div class="foot-nav-flex">
                <div class="foot-nav-col">
                    <div class="foot-nav-label">Navigation</div>
                    <a href="/welcome.html" class="foot-link">Home</a>
                    <a href="/#about" class="foot-link">About</a>
                    <a href="/#gallery" class="foot-link" style="display: none;" >Gallery</a>
                </div>
                <div class="foot-nav-col">
                    <div class="foot-nav-label">Company</div>
                    <a href="/welcome.html" class="foot-link">Privacy policy</a>
                    <a href="/welcome.html" class="foot-link">Terms</a>
                    <a href="/#contact" class="foot-link">Contact</a>
                </div>
            </div>
            <a href="/#contact" class="foot-btn">Get in Touch</a>
        </div>
    `;
    if(!document.querySelector(".chat")){
        document.body.appendChild(footer);
    }
}
createHtml();

const menuContainer = document.querySelector(".menu-container");
let url = "https://servers.nextdesignwebsite.com/club";
if(window.location.href.includes("localhost")){
    url = "";
}
let params = new URLSearchParams(window.location.search);

function openMenu(){
    menuContainer.style.opacity = "1";
    menuContainer.style.pointerEvents = "auto";
}
function closeMenu(){
    menuContainer.style.opacity = "0";
    menuContainer.style.pointerEvents = "none";
}

const observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
	if (entry.isIntersecting) {
		entry.target.style.transform = "translateY(0px)";
		entry.target.style.opacity = "1";

	observer.unobserve(entry.target);
	}
});
}, {
	threshold: 0.2,
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});

function startAnimation(){
    document.querySelectorAll(".load-title span").forEach((span, idx) => {
        setTimeout(() => {
            span.style.transform = "translateY(0px)";
            span.style.opacity = "1";
            if(idx == 2){
                setTimeout(() => {
                    if(document.querySelector(".hero-video video").readyState >= 3){
                        document.querySelector(".load-container").style.opacity = "0";
                        document.querySelector(".load-container").style.pointerEvents = "none";
                        document.querySelectorAll(".starter").forEach((el, idx) => {
                            setTimeout(() => {
                                el.style.transform = "translateY(0px)";
                                el.style.opacity = "1";
                            }, (idx + 1) * 300);
                        });
                    } else {
                        document.querySelector(".hero-video video").addEventListener("canplay", () => {
                            document.querySelector(".load-container").style.opacity = "0";
                            document.querySelector(".load-container").style.pointerEvents = "none";
                            document.querySelectorAll(".starter").forEach((el, idx) => {
                                setTimeout(() => {
                                    el.style.transform = "translateY(0px)";
                                    el.style.opacity = "1";
                                }, (idx + 1) * 300);
                            });
                        });
                        setTimeout(() => {
                            document.querySelector(".load-container").style.opacity = "0";
                            document.querySelector(".load-container").style.pointerEvents = "none";
                            document.querySelectorAll(".starter").forEach((el, idx) => {
                                setTimeout(() => {
                                    el.style.transform = "translateY(0px)";
                                    el.style.opacity = "1";
                                }, (idx + 1) * 300);
                            });
                        }, 3500);
                    }
                }, 1000);
            }
        }, (idx + 1) * 300);
    });
}
startAnimation();

function createAnc(){
    async function getAnnouncements() {
        try {
            const response = await fetch(`${url}/api/get-announcements`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json(); 
            if(data.message == "success"){
                let ancModal = document.createElement("div");
                ancModal.classList.add("anc-modal");
                ancModal.innerHTML = `
                    <div class="anc-wrapper">
                        <i class="fa-solid fa-xmark anc-xmark"></i>
                        <div class="anc-top">
                            <div class="anc-title">Announcements</div>
                            <div onclick="createAncPost()" class="anc-btn"><i class="fa-solid fa-plus"></i> Create</div>
                        </div>
                        <div class="anc-ul">
                        <!--
                            <div class="anc-li">
                                <div class="anc-info">
                                    <div class="anc-pfp">
                                        <img src="images/pfp4.png" />
                                    </div>
                                    <div>
                                        <div class="anc-name">John Smith</div>
                                        <div class="anc-date">Created at 25/12/2025</div>
                                    </div>
                                </div>
                                <div class="anc-head">New Training Videos</div>
                                <div class="anc-para">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius deserunt minima adipisci saepe. Necessitatibus quam laborum vero labore quo veniam inventore repudiandae impedit nostrum dolore, explicabo nobis veritatis quaerat nam iusto adipisci!
                                </div>
                            </div>
                            -->
                            <div class="empty-txt" style="margin-bottom: 18px;">Sorry, we couldn't find any announcements to show here. Try again later.</div>
                        </div>
                    </div>
                `;
                document.body.appendChild(ancModal);

                const userData = data.userData;
                if(userData.perms != "admin"){
                    ancModal.querySelector(".anc-btn").style.display = "none";
                }

                data.announcements.forEach(anc => {
                    let newAnc = document.createElement("div");
                    newAnc.classList.add("anc-li");
                    newAnc.id = "anc-" + anc.id;
                    newAnc.innerHTML = `
                        <div class="anc-info">
                            <div class="anc-pfp">
                                <img src="images/pfp4.png" />
                            </div>
                            <div>
                                <div class="anc-name">${userData.name}</div>
                                <div class="anc-date">Created ${anc.full_date}</div>
                            </div>
                        </div>
                        <div class="anc-head">${anc.head}</div>
                        <div class="anc-para">
                            ${anc.para}
                        </div>
                    `;
                    ancModal.querySelector(".anc-ul").appendChild(newAnc);
                });

                if(data.announcements.length == 0){
                    ancModal.querySelector(".empty-txt").style.display = "block";
                } else {
                    ancModal.querySelector(".empty-txt").style.display = "none";
                }

                setTimeout(() => {
                    ancModal.style.opacity = "1";
                    ancModal.style.pointerEvents = "auto";
                }, 50);

                ancModal.addEventListener("click", (e) => {
                    if(!document.querySelector(".anc-wrapper").contains(e.target)){
                        ancModal.style.opacity = "0";
                        ancModal.style.pointerEvents = "none";
                        setTimeout(() => {
                            document.body.appendChild(ancModal);
                        }, 300);
                    }
                });
                ancModal.querySelector("i.anc-xmark").addEventListener("click", () => {
                    ancModal.style.opacity = "0";
                    ancModal.style.pointerEvents = "none";
                    setTimeout(() => {
                        document.body.appendChild(ancModal);
                    }, 300);
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    getAnnouncements();
}
function createAncPost(){
    document.querySelectorAll(".anc-modal").forEach(other => {
        other.style.opacity = "0";
        other.style.pointerEvents = "none";
    });

    let newPost = document.createElement("div");
    newPost.classList.add("new-modal");
    newPost.innerHTML = `
        <form class="new-wrapper">
            <i class="fa-solid fa-xmark new-xmark"></i>
            <div class="new-title">Post Announcement</div>
            <div class="new-col">
                <div class="new-label">Heading</div>
                <input type="text" placeholder="Enter heading" class="new-input" name="heading" required />

                <div class="new-label">Message</div>
                <textarea name="message" placeholder="Enter message" class="new-area" required></textarea>
            </div>
            <button type="submit" class="new-btn" id="loginBtn">Create Post</button>
        </form>
    `;
    document.body.appendChild(newPost);

    newPost.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(url + "/api/post-announcement", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const responseData = await res.json();
        if(responseData.message == "success"){
            newPost.style.opacity = "0";
            newPost.style.pointerEvents = "none";
            createThank("Your post has been created <br> successfully. Thank you!");
        }
    });

    setTimeout(() => {
        newPost.style.opacity = "1";
        newPost.style.pointerEvents = "auto";
    }, 50);
    newPost.addEventListener("click", (e) => {
        if(!newPost.querySelector("form").contains(e.target)){
            newPost.style.opacity = "0";
            newPost.style.pointerEvents = "none";
            setTimeout(() => {
                document.body.appendChild(newPost);
            }, 300);
        }
    });
    newPost.querySelector("i.new-xmark").addEventListener("click", () => {
        newPost.style.opacity = "0";
        newPost.style.pointerEvents = "none";
        setTimeout(() => {
            document.body.appendChild(newPost);
        }, 300);
    });
}
function createAdminPannel(){
    let newPan = document.createElement("div");
    newPan.classList.add("new-modal");
    newPan.innerHTML = `
        <div class="new-wrapper">
            <i class="fa-solid fa-xmark new-xmark"></i>
            <div class="new-title">Admin Pannel</div>

            <div class="pan-option pan-manage">Manage Members</div>
            <div class="pan-option pan-application">Member Applications</div>
            <div class="pan-option pan-event">Create Event</div>
            <a href="/dashboard.html" class="pan-option">Manage Events</a>
            <div class="pan-option pan-post" style="margin-bottom: 0px;">Post Announcement</div>
        </div>
    `;
    document.body.appendChild(newPan);

    newPan.querySelector(".pan-manage").addEventListener("click", () => {
        newPan.style.opacity = "0";
        newPan.style.pointerEvents = "none";
        createView();
    });
    newPan.querySelector(".pan-application").addEventListener("click", () => {
        newPan.style.opacity = "0";
        newPan.style.pointerEvents = "none";
        createApplication();
    });
    newPan.querySelector(".pan-event").addEventListener("click", () => {
        newPan.style.opacity = "0";
        newPan.style.pointerEvents = "none";
        createEventPost();
    });
    newPan.querySelector(".pan-post").addEventListener("click", () => {
        newPan.style.opacity = "0";
        newPan.style.pointerEvents = "none";
        createAncPost();
    });

    setTimeout(() => {
        newPan.style.opacity = "1";
        newPan.style.pointerEvents = "auto";
    }, 50);
    newPan.addEventListener("click", (e) => {
        if(!newPan.querySelector(".new-wrapper").contains(e.target)){
            newPan.style.opacity = "0";
            newPan.style.pointerEvents = "none";
            setTimeout(() => {
                document.body.appendChild(newPan);
            }, 300);
        }
    });
    newPan.querySelector("i.new-xmark").addEventListener("click", () => {
        newPan.style.opacity = "0";
        newPan.style.pointerEvents = "none";
        setTimeout(() => {
            document.body.appendChild(newPan);
        }, 300);
    });
}
function createEventPost(){
    let newEvent = document.createElement("div");
    newEvent.classList.add("new-modal");
    newEvent.innerHTML = `
        <form id="eventForm" class="new-wrapper">
            <i class="fa-solid fa-xmark new-xmark"></i>
            <div class="new-title">Create Event</div>
            <div class="new-col">
                <div class="new-label">Event Title</div>
                <input type="text" placeholder="Enter Title" class="new-input" name="title" required />

                <div class="new-label">Event Description</div>
                <textarea name="description" placeholder="Enter Description" class="new-area" required></textarea>

                <div class="new-label">Event Date</div>
                <input type="text" placeholder="dd/mm/yyyy" class="new-input" name="date" required />

                <input type="hidden" placeholder="15:00" class="new-input" name="time" value="n/a" required />

                <div class="new-label">Meeting Type</div>
                <div class="new-pill-flex">
                    <div class="new-pill new-pill-active" id="event-online">Online</div>
                    <div class="new-pill" id="event-irl">Real life</div>
                    <input type="hidden" name="where" value="online" id="eventWhere" />
                </div>

                <div class="new-label" id="eventLinkLabel">Meeting Link</div>
                <input type="text" placeholder="Enter Link" class="new-input" name="link" id="eventLinkFlex" required />
            </div>
            <div id="invalidError" class="new-error">Enter a valid date: 'dd/mm/yyyy'.</div>
            <button type="submit" class="new-btn" id="loginBtn">Create Event</button>
        </form>
    `;
    document.body.appendChild(newEvent);

    newEvent.querySelectorAll(".new-pill-flex").forEach(flex => {
        flex.querySelectorAll(".new-pill").forEach((pill, idx) => {
            pill.addEventListener("click", () => {
                if(!pill.classList.contains("new-pill-active")){
                    flex.querySelectorAll(".new-pill").forEach(other => {
                        other.classList.remove("new-pill-active");
                    });
                    pill.classList.add("new-pill-active");
                    flex.querySelector("input").value = pill.id.split("-")[1];
                }
                if(idx == 0){
                    document.getElementById("eventLinkLabel").style.display = "block";
                    document.getElementById("eventLinkFlex").style.display = "block";
                    document.getElementById("eventLinkFlex").value = "";
                } else {
                    document.getElementById("eventLinkLabel").style.display = "none";
                    document.getElementById("eventLinkFlex").style.display = "none";
                    document.getElementById("eventLinkFlex").value = "n/a";
                }
            });
        });
    });

    newEvent.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(url + "/api/create-event", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const responseData = await res.json();
        if(responseData.message == "success"){
            newEvent.style.opacity = "0";
            newEvent.style.pointerEvents = "none";
            createThank("Your event has been created <br> successfully. Thank you!");
        } else if(responseData.message == "invaliddate"){
            newEvent.querySelector(".new-error").style.display = "block";
            setTimeout(() => {
                newEvent.querySelector(".new-error").style.display = "none";
            }, 2000);
        }
    });

    setTimeout(() => {
        newEvent.style.opacity = "1";
        newEvent.style.pointerEvents = "auto";
    }, 50);
    newEvent.addEventListener("click", (e) => {
        if(!newEvent.querySelector(".new-wrapper").contains(e.target)){
            newEvent.style.opacity = "0";
            newEvent.style.pointerEvents = "none";
            setTimeout(() => {
                document.body.appendChild(newEvent);
            }, 300);
        }
    });
    newEvent.querySelector("i.new-xmark").addEventListener("click", () => {
        newEvent.style.opacity = "0";
        newEvent.style.pointerEvents = "none";
        setTimeout(() => {
            document.body.appendChild(newEvent);
        }, 300);
    });
}
function createView(){
    async function getMembers(){
        try {
            const response = await fetch(`${url}/api/get-members`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                credentials: 'include'
            });
            const data = await response.json(); 

            let newModal = document.createElement("div");
            newModal.classList.add("new-modal");
            newModal.innerHTML = `
                <div class="new-wrapper">
                    <i class="fa-solid fa-xmark anc-xmark"></i>
                    <div class="anc-top">
                        <div class="anc-title">Members</div>
                    </div>

                    <div class="usr-ul">
                        <div class="empty-txt">Sorry, we couldn't find any members to show here. Try again later.</div>
                    </div>
                </div>
            `;
            document.body.appendChild(newModal);

            data.members.forEach(member => {
                let newMember = document.createElement("div");
                newMember.classList.add("usr-li");
                newMember.innerHTML = `
                    <div class="usr-name">${member.name} (${member.business})</div>
                    <i class="fa-solid fa-trash usr-delete"></i>
                `;
                newMember.querySelector("i.usr-delete").addEventListener("click", () => {
                    newMember.style.display = "none";
                    async function deleteUser(){
                        const dataToSend = { id: member.id };
                        try {
                            const response = await fetch(url + '/api/delete-user', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    'Content-Type': 'application/json', 
                                },
                                body: JSON.stringify(dataToSend), 
                            });

                            if (!response.ok) {
                                const errorData = await response.json();
                                console.error('Error:', errorData.message);
                                return;
                            }

                            const data = await response.json();
                        } catch (error) {
                            console.error('Error posting data:', error);
                        }
                    }
                    deleteUser();
                });
                newModal.querySelector(".usr-ul").appendChild(newMember);
            });
            if(data.members.length == 0){
                newModal.querySelector(".empty-txt").style.display = "block";
            } else {
                newModal.querySelector(".empty-txt").style.display = "none";
            }

            setTimeout(() => {
                newModal.style.opacity = "1";
                newModal.style.pointerEvents = "auto";
            }, 50);
            newModal.addEventListener("click", (e) => {
                if(!newModal.querySelector(".new-wrapper").contains(e.target)){
                    newModal.style.opacity = "0";
                    newModal.style.pointerEvents = "none";
                    setTimeout(() => {
                        document.body.appendChild(newModal);
                    }, 300);
                }
            });
            newModal.querySelector("i.anc-xmark").addEventListener("click", () => {
                newModal.style.opacity = "0";
                newModal.style.pointerEvents = "none";
                setTimeout(() => {
                    document.body.appendChild(newModal);
                }, 300);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    getMembers();
}
function createEdit(event){
    let newModal = document.createElement("div");
    newModal.classList.add("new-modal");
    newModal.innerHTML = `
        <form class="new-wrapper">
            <i class="fa-solid fa-xmark new-xmark"></i>
            <div class="new-title">Edit Event</div>
            <div class="new-col">
                <div class="new-label">Event Title</div>
                <input type="text" placeholder="Enter Title" class="new-input" value="${event.title}" name="title" required />

                <div class="new-label">Event Description</div>
                <textarea name="description" placeholder="Enter Description" class="new-area" required>${event.event_description}</textarea>

                <div class="new-label">Event Date</div>
                <input type="text" placeholder="dd/mm/yyyy" class="new-input" name="date" value="${event.event_date.split("-")[2]}/${event.event_date.split("-")[1]}/${event.event_date.split("-")[0]}" required />

                <input type="hidden" placeholder="15:00" class="new-input" name="time" value="n/a" required />

                <div class="new-label">Meeting Type</div>
                <div class="new-pill-flex">
                    <div class="new-pill new-pill-active" id="event-online">Online</div>
                    <div class="new-pill" id="event-irl">Real life</div>
                    <input type="hidden" name="where" value="online" id="eventWhere" />
                </div>

                <div class="new-label eventlinklabel">Meeting Link</div>
                <input type="text" placeholder="Enter Link" class="new-input eventlinkflex" name="link" value="${event.event_link}" required />

                <input type="hidden" name="id" value="${event.id}" />
            </div>
            <div id="invalidError" class="new-error">Enter a valid date: 'dd/mm/yyyy'.</div>
            <button type="submit" class="new-btn">Save Changes</button>
        </form>
    `;
    document.body.appendChild(newModal);

    newModal.querySelectorAll(".new-pill-flex").forEach(flex => {
        flex.querySelectorAll(".new-pill").forEach((pill, idx) => {
            pill.addEventListener("click", () => {
                if(!pill.classList.contains("new-pill-active")){
                    flex.querySelectorAll(".new-pill").forEach(other => {
                        other.classList.remove("new-pill-active");
                    });
                    pill.classList.add("new-pill-active");
                    flex.querySelector("input").value = pill.id.split("-")[1];
                }
                if(idx == 0){
                    newModal.querySelector(".eventlinklabel").style.display = "block";
                    newModal.querySelector(".eventlinkflex").style.display = "block";
                } else {
                    newModal.querySelector(".eventlinklabel").style.display = "none";
                    newModal.querySelector(".eventlinkflex").style.display = "none";
                }
            });
        });
    });

    if(event.event_where == "irl"){
        newModal.querySelectorAll(".new-pill")[1].click();
    } else {
        newModal.querySelectorAll(".new-pill")[0].click();
    }

    newModal.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(url + "/api/edit-event", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const responseData = await res.json();
        if(responseData.message == "success"){
            newModal.style.opacity = "0";
            newModal.style.pointerEvents = "none";
            createThank("Your event has been saved <br> successfully. Thank you!");
        } else if(responseData.message == "invaliddate"){
            newModal.querySelector(".new-error").style.display = "block";
            setTimeout(() => {
                newModal.querySelector(".new-error").style.display = "none";
            }, 2000);
        }
    });

    setTimeout(() => {
        newModal.style.opacity = "1";
        newModal.style.pointerEvents = "auto";
    }, 50);
    newModal.addEventListener("click", (e) => {
        if(!newModal.querySelector("form").contains(e.target)){
            newModal.style.opacity = "0";
            newModal.style.pointerEvents = "none";
            setTimeout(() => {
                document.body.appendChild(newModal);
            }, 300);
        }
    });
    newModal.querySelector("i.new-xmark").addEventListener("click", () => {
        newModal.style.opacity = "0";
        newModal.style.pointerEvents = "none";
        setTimeout(() => {
            document.body.appendChild(newModal);
        }, 300);
    });
}
function createApplication(){
    async function getMembers(){
        try {
            const response = await fetch(`${url}/api/get-applications`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json(); 

            let newModal = document.createElement("div");
            newModal.classList.add("new-modal");
            newModal.innerHTML = `
                <div class="new-wrapper">
                    <i class="fa-solid fa-xmark anc-xmark"></i>
                    <div class="anc-top">
                        <div class="anc-title">Member Applications</div>
                    </div>

                    <div class="usr-ul">
                        <div class="empty-txt">Sorry, we couldn't find any applications to show here. Try again later.</div>
                    </div>
                </div>
            `;
            document.body.appendChild(newModal);

            data.members.forEach(member => {
                let newMember = document.createElement("div");
                newMember.classList.add("usr-li");
                newMember.innerHTML = `
                    <div class="usr-name">${member.name} (${member.business})</div>
                    <i class="fa-solid fa-check usr-accept"></i>
                `;
                newMember.querySelector("i.usr-accept").addEventListener("click", () => {
                    newMember.style.display = "none";
                    async function acceptMember(){
                        const dataToSend = { id: member.id, email: member.email };
                        try {
                            const response = await fetch(url + '/api/accept-member', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    'Content-Type': 'application/json', 
                                },
                                body: JSON.stringify(dataToSend), 
                            });

                            if (!response.ok) {
                                const errorData = await response.json();
                                console.error('Error:', errorData.message);
                                return;
                            }

                            const data = await response.json();
                        } catch (error) {
                            console.error('Error posting data:', error);
                        }
                    }
                    acceptMember();
                });
                newModal.querySelector(".usr-ul").appendChild(newMember);
            });
            if(data.members.length == 0){
                newModal.querySelector(".empty-txt").style.display = "block";
            } else {
                newModal.querySelector(".empty-txt").style.display = "none";
            }

            setTimeout(() => {
                newModal.style.opacity = "1";
                newModal.style.pointerEvents = "auto";
            }, 50);
            newModal.addEventListener("click", (e) => {
                if(!newModal.querySelector(".new-wrapper").contains(e.target)){
                    newModal.style.opacity = "0";
                    newModal.style.pointerEvents = "none";
                    setTimeout(() => {
                        document.body.appendChild(newModal);
                    }, 300);
                }
            });
            newModal.querySelector("i.anc-xmark").addEventListener("click", () => {
                newModal.style.opacity = "0";
                newModal.style.pointerEvents = "none";
                setTimeout(() => {
                    document.body.appendChild(newModal);
                }, 300);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    getMembers();
}
function createProfile(){
    let newModal = document.createElement("div");
    newModal.classList.add("new-modal");
    newModal.innerHTML = `
        <form class="new-wrapper">
            <i class="fa-solid fa-xmark new-xmark"></i>
            <div class="new-title">Edit Profile</div>
            <div class="new-col">
                <div class="new-label">Full Name</div>
                <input type="text" placeholder="Enter Name" class="new-input" name="name" value="${userData.name}" required />

                <div class="new-label">Email Address</div>
                <input type="text" placeholder="Enter Email" class="new-input" name="email" value="${userData.email}" required />

                <div class="new-label">Phone Number</div>
                <input type="text" placeholder="Enter Phone" class="new-input" name="phone" value="${userData.phone}" required />

                <div class="new-label">Business Industry</div>
                <input type="text" placeholder="Enter Industry" class="new-input" name="business" value="${userData.business}" />

                <div class="edit-upload">
                    <i class="fa-solid fa-xmark edit-close"></i>
                    <div class="edit-upload-content">
                        <img src="images/icons/upload.png" class="edit-upload-icon" />
                        <div class="edit-upload-btn">Upload Photo</div>
                    </div>
                    <div class="edit-upload-img">
                        <img src="images/upload_temp.png" />
                    </div>
                </div>
                <input type="file" accept="image/*" id="photoInput" style="display: none;" />
            </div>
            <button type="submit" class="new-btn">Save Changes</button>
        </form>
    `;
    document.body.appendChild(newModal);

    if(userData.pfp != "/images/pfp_base.png"){
        document.querySelector(".edit-upload-img img").src = userData.pfp;
        document.querySelector(".edit-upload-content").style.opacity = "0";
        setTimeout(() => {
            document.querySelector(".edit-upload-content").style.display = "none";
            document.querySelector(".edit-upload-img").style.display = "flex";
            setTimeout(() => {
                document.querySelector("i.edit-close").style.opacity = "1";
                document.querySelector(".edit-upload-img").style.opacity = "1";
                document.querySelector(".edit-upload-img").style.maxHeight = "600px";
                document.querySelector(".edit-upload-img").style.marginTop = "25px";
            }, 50);
        }, 300);
    }

    newModal.querySelectorAll(".new-pill-flex").forEach(flex => {
        flex.querySelectorAll(".new-pill").forEach((pill, idx) => {
            pill.addEventListener("click", () => {
                if(!pill.classList.contains("new-pill-active")){
                    flex.querySelectorAll(".new-pill").forEach(other => {
                        other.classList.remove("new-pill-active");
                    });
                    pill.classList.add("new-pill-active");
                    flex.querySelector("input").value = pill.id.split("-")[1];
                }
            });
        });
    });

    document.getElementById("photoInput").addEventListener("change", async (e) => {
        document.querySelector(".edit-upload-img img").src = URL.createObjectURL(e.target.files[0]);
        document.querySelector(".edit-upload-content").style.opacity = "0";
        setTimeout(() => {
            document.querySelector(".edit-upload-content").style.display = "none";
            document.querySelector(".edit-upload-img").style.display = "flex";
            setTimeout(() => {
                document.querySelector("i.edit-close").style.opacity = "1";
                document.querySelector(".edit-upload-img").style.opacity = "1";
                document.querySelector(".edit-upload-img").style.maxHeight = "600px";
                document.querySelector(".edit-upload-img").style.marginTop = "25px";
            }, 50);
        }, 300);

        const formData = new FormData();
        formData.append("pfp", e.target.files[0]);

        const res = await fetch(`${url}/api/upload-pfp`, {
            method: "POST",
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: formData,
        });

        const data = await res.json();
        if (data.success) {
            console.log("PFP uploaded successfully!");
        }
    });

    document.querySelector("i.edit-close").addEventListener("click", () => {
        document.querySelector(".edit-upload-img").style.opacity = "0";
        document.querySelector(".edit-upload-img").style.maxHeight = "0px";
        document.querySelector(".edit-upload-img").style.marginTop = "0px";
        setTimeout(() => {
            document.querySelector(".edit-upload-content").style.display = "flex";
            document.querySelector(".edit-upload-img").style.display = "none";
            setTimeout(() => {
                document.querySelector("i.edit-close").style.opacity = "0";
                document.querySelector(".edit-upload-content").style.opacity = "1";
            }, 50);
        }, 400);

        async function deletePfp(){
            try {
                const response = await fetch(`${url}/api/delete-pfp`, {
                    method: 'GET',
                    headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
                    credentials: 'include'
                });
                const data = await response.json(); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        deletePfp();
    });

    document.querySelector(".edit-upload-btn").addEventListener("click", () => {
        document.getElementById("photoInput").click();
    });

    newModal.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(url + "/api/edit-profile", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const responseData = await res.json();
        if(responseData.message == "success"){
            newModal.style.opacity = "0";
            newModal.style.pointerEvents = "none";
            createThank("Your event has been saved <br> successfully. Thank you!");
        } else if(responseData.message == "invaliddate"){
            newModal.querySelector(".new-error").style.display = "block";
            setTimeout(() => {
                newModal.querySelector(".new-error").style.display = "none";
            }, 2000);
        }
    });

    setTimeout(() => {
        newModal.style.opacity = "1";
        newModal.style.pointerEvents = "auto";
    }, 50);
    newModal.addEventListener("click", (e) => {
        if(!newModal.querySelector("form").contains(e.target)){
            newModal.style.opacity = "0";
            newModal.style.pointerEvents = "none";
            setTimeout(() => {
                document.body.appendChild(newModal);
            }, 300);
        }
    });
    newModal.querySelector("i.new-xmark").addEventListener("click", () => {
        newModal.style.opacity = "0";
        newModal.style.pointerEvents = "none";
        setTimeout(() => {
            document.body.appendChild(newModal);
        }, 300);
    });
}
function createChat(){
    let newPan = document.createElement("div");
    newPan.classList.add("new-modal");
    newPan.innerHTML = `
        <div class="new-wrapper">
            <i class="fa-solid fa-xmark new-xmark"></i>
            <div class="new-title">Community Chat</div>

            <a class="pan-option" href="/chat.html?chat=general">General Chat</a>
            <a class="pan-option" href="/chat.html?chat=wins">Wins & Goals</a>
            <a class="pan-option" href="/chat.html?chat=help">Questions & Help</a>
            <a class="pan-option" href="/chat.html?chat=offtopic">Off Topic</a>
        </div>
    `;
    document.body.appendChild(newPan);

    setTimeout(() => {
        newPan.style.opacity = "1";
        newPan.style.pointerEvents = "auto";
    }, 50);
    newPan.addEventListener("click", (e) => {
        if(!newPan.querySelector(".new-wrapper").contains(e.target)){
            newPan.style.opacity = "0";
            newPan.style.pointerEvents = "none";
            setTimeout(() => {
                document.body.appendChild(newPan);
            }, 300);
        }
    });
    newPan.querySelector("i.new-xmark").addEventListener("click", () => {
        newPan.style.opacity = "0";
        newPan.style.pointerEvents = "none";
        setTimeout(() => {
            document.body.appendChild(newPan);
        }, 300);
    });
}

function createThank(mesg){
    let newThank = document.createElement("div");
    newThank.classList.add("book-modal");
    newThank.innerHTML = `
        <div class="book-wrapper">
            <i class="fa-solid fa-check book-modal-check"></i>
            <div class="book-modal-title">Thank You!</div>
            <div class="book-modal-para">${mesg}</div>
            <div class="btn-book-modal">Okay</div>
        </div>
    `;
    newThank.querySelector(".btn-book-modal").addEventListener("click", () => {
        if(document.querySelector(".dashboard")){
            window.location.reload();
        }
        newThank.style.opacity = "0";
        newThank.style.pointerEvents = "none"; 
    });

    document.body.appendChild(newThank);

    setTimeout(() => {
        newThank.style.opacity = "1";
        newThank.style.pointerEvents = "auto";
    }, 150);
}
function createError(title, mesg){
    let newThank = document.createElement("div");
    newThank.classList.add("book-modal");
    newThank.innerHTML = `
        <div class="book-wrapper">
            <i class="fa-solid fa-xmark book-modal-check"></i>
            <div class="book-modal-title">${title}</div>
            <div class="book-modal-para">${mesg}</div>
            <div class="btn-book-modal">Okay</div>
        </div>
    `;
    console.log(newThank);
    newThank.querySelector(".btn-book-modal").addEventListener("click", () => {
        newThank.style.opacity = "0";
        newThank.style.pointerEvents = "none"; 
    });

    document.body.appendChild(newThank);

    setTimeout(() => {
        newThank.style.opacity = "1";
        newThank.style.pointerEvents = "auto";
    }, 150);
}

function getCurrentDate() {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}



if(document.querySelector(".home")){
    function applyToggle(){
        document.getElementById("applyModal").style.opacity = "1";
        document.getElementById("applyModal").style.pointerEvents = "auto";
    }
    document.getElementById("applyModal").addEventListener("click", (e) => {
        if(!document.getElementById("applyModal").querySelector(".new-wrapper").contains(e.target)){
            document.getElementById("applyModal").style.opacity = "0";
            document.getElementById("applyModal").style.pointerEvents = "none";
        }
    });
    document.getElementById("applyModal").querySelector("i.new-xmark").addEventListener("click", () => {
        document.getElementById("applyModal").style.opacity = "0";
        document.getElementById("applyModal").style.pointerEvents = "none";
    });
    
    function loginToggle(){
        document.getElementById("loginModal").style.opacity = "1";
        document.getElementById("loginModal").style.pointerEvents = "auto";
    }
    document.getElementById("loginModal").addEventListener("click", (e) => {
        if(!document.getElementById("loginModal").querySelector(".new-wrapper").contains(e.target)){
            document.getElementById("loginModal").style.opacity = "0";
            document.getElementById("loginModal").style.pointerEvents = "none";
        }
    });
    document.getElementById("loginModal").querySelector("i.new-xmark").addEventListener("click", () => {
        document.getElementById("loginModal").style.opacity = "0";
        document.getElementById("loginModal").style.pointerEvents = "none";
    });

    document.getElementById("applyForm").addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(url + "/api/apply", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const responseData = await res.json();
        if(responseData.message == "success"){
            document.getElementById("applyModal").style.opacity = "0";
            document.getElementById("applyModal").style.pointerEvents = "none";
            createThank("Your application has been sent <br> successfully. Thank you!");
        }
    });
    document.querySelectorAll(".new-pill-flex").forEach(flex => {
        flex.querySelectorAll(".new-pill").forEach(pill => {
            pill.addEventListener("click", () => {
                if(!pill.classList.contains("new-pill-active")){
                    flex.querySelectorAll(".new-pill").forEach(other => {
                        other.classList.remove("new-pill-active");
                    });
                    pill.classList.add("new-pill-active");
                    flex.querySelector("input").value = pill.id.split("-")[1];
                }
                if(pill.id.split("-")[1] == "other"){
                    document.querySelector(".industrylabel").style.display = "block";
                    document.querySelector(".industryinput").style.display = "block";
                } else if(document.querySelector(".industrylabel").style.display == "block"){
                    document.querySelector(".industrylabel").style.display = "none";
                    document.querySelector(".industryinput").style.display = "none";
                }
            });
        });
    });

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(url + "/api/login", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const responseData = await res.json();
        if(responseData.message == "success"){
            localStorage.setItem("token", responseData.token);
            window.location.href = "/welcome.html";
        } else if(responseData.message == "invalidpassword"){
            document.getElementById("invalidError").style.display = "block";
            setTimeout(() => {
                document.getElementById("invalidError").style.display = "none";
            }, 2000);
        } else if(responseData.message == "nouser"){
            document.getElementById("userError").style.display = "block";
            setTimeout(() => {
                document.getElementById("userError").style.display = "none";
            }, 2000);
        }
    });

    if(params.get("token")){
        async function verifyUser() {
            const dataToSend = { token: params.get("token") };
            try {
                const response = await fetch(url + '/api/verify-user', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(dataToSend), 
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                    return;
                }

                const data = await response.json();
                if(data.message == "nouser"){
                    createError("No User Found", "We couldn't find this user in the<br> database. Try again later.");
                } else if(data.message == "success"){
                    createThank(data.name + " has been successfully added<br> as a member. Thank you!");
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
        verifyUser();
    }

    if(params.get("login")){
        loginToggle();
    }
}

if(!document.querySelector(".home")){
    async function getUser() {
        try {
            const response = await fetch(`${url}/api/get-user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                credentials: 'include'
            });
            const data = await response.json(); 

            if(data.message == "success"){
                userData = data.userData;
            } else if(data.message == "nouser" || data.message == "unauth"){
                window.location.href = "/";
            }

            if(userData.perms == "admin"){
                document.querySelectorAll(".admin-element").forEach(el => {
                    el.classList.remove("admin-element");
                });
            }

            async function getNews(){
                try {
                    const response = await fetch(`${url}/api/get-announcements`, {
                        method: 'GET',
                        credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                    });
                    const data = await response.json(); 
                    if(data.message == "success"){
                        let para = "";
                        for(let i = 0; i < 100; i++){
                            para += " " + data.announcements[0].para;
                        }
                        document.querySelector(".news-txt").textContent = `${para}`;
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            getNews();

            if(document.querySelector(".dashboard")){
                function setCalendar(monthIdx, yearStr, firstCall){
                    document.querySelector(".cal-nav-title").textContent = months[monthIdx] + " " + yearStr;
                    document.querySelector(".lac-nav-title").textContent = months[monthIdx] + " " + yearStr;

                    let startIdx = firstDay(monthIdx, yearStr);
                    let endIdx = totalDays(monthIdx, yearStr);

                    let bookings = [];
                    async function getBookings(){
                        const dataToSend = { month: monthIdx + 1, year: yearStr };
                        try {
                            const response = await fetch(url + '/api/get-events', {
                                method: 'POST',
                                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    'Content-Type': 'application/json', 
                                },
                                credentials: 'include',
                                body: JSON.stringify(dataToSend), 
                            });

                            if (!response.ok) {
                                const errorData = await response.json();
                                console.error('Error:', errorData.message);
                                return;
                            }

                            const responseData = await response.json();
                            bookings = responseData.bookings;

                            resetBoxes();
                            document.querySelectorAll(".cal-box").forEach((box, idx) => {
                                if(idx >= startIdx && idx < (endIdx + startIdx)){
                                    box.querySelector(".cal-box-day").textContent = String(idx - (startIdx - 1));
                                    let boxDay = Number(String(idx - (startIdx - 1)));

                                    if(monthIdx == startPosition && boxDay == todayDate && startYear == currentYear){
                                        makeBoxToday(box);
                                        if(firstCall){
                                            todayBox = box;
                                        }
                                    }

                                    bookings.forEach(booking => {
                                        if(Number(booking.event_date.slice(8, 10)) == boxDay){
                                            let joinBtn = "";
                                            if(booking.event_where == "online") joinBtn = `<a href="${booking.event_link}" target="_blank" class="cal-event-cta">Join Call</a>`;
                                            box.classList.add("cal-box-event");
                                            box.innerHTML += `
                                                <i class="fa-solid fa-trash box-icon box-delete-icon"></i>
                                                <i class="fa-solid fa-pen-to-square box-icon box-edit-icon"></i>
                                                
                                                <div class="cal-event-head">${booking.title}</div>
                                                ${joinBtn}
                                            `;

                                            box.querySelector("i.box-delete-icon").addEventListener("click", () => {
                                                async function deleteEvent(){
                                                    const dataToSend = { id: booking.id };
                                                    try {
                                                        const response = await fetch(url + '/api/delete-event', {
                                                            method: 'POST',
                                                            credentials: 'include',
                                                            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                                'Content-Type': 'application/json', 
                                                            },
                                                            body: JSON.stringify(dataToSend), 
                                                        });

                                                        if (!response.ok) {
                                                            const errorData = await response.json();
                                                            console.error('Error:', errorData.message);
                                                            return;
                                                        }

                                                        const data = await response.json();
                                                        if(data.message == "success"){
                                                            createThank("The event has been deleted<br> successfully. Thank you!");
                                                        }
                                                    } catch (error) {
                                                        console.error('Error posting data:', error);
                                                    }
                                                }
                                                deleteEvent();
                                            });

                                            box.querySelector("i.box-edit-icon").addEventListener("click", () => {
                                                createEdit(booking);
                                            });
                                        }
                                    });
                                } else {
                                    box.classList.add("cal-day-disabled");
                                }
                            });

                            document.querySelectorAll(".lac-top-mon").forEach(mon => mon.style.display = "none");
                            document.querySelectorAll(".lac-box").forEach((box, idx) => {
                                if(idx >= startIdx && idx < (endIdx + startIdx)){
                                    box.querySelector(".lac-box-day").textContent = String(idx - (startIdx - 1));
                                    let boxDay = Number(String(idx - (startIdx - 1)));
                                    document.querySelectorAll(".lac-top-mon")[idx].style.display = "flex";
                                    let subtractNum = Math.floor(idx / 7) * 7;
                                    document.querySelectorAll(".lac-top-mon")[idx].textContent = days[idx - subtractNum];

                                    if(monthIdx == startPosition && boxDay == todayDate && startYear == currentYear){
                                        makeBoxToday(box);
                                        document.querySelector(".lac-flex").scrollLeft = box.offsetLeft;
                                        //box.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                                        if(firstCall){
                                            todayBox = box;
                                        }
                                    }

                                    bookings.forEach(booking => {
                                        if(Number(booking.event_date.slice(8, 10)) == boxDay){
                                            let joinBtn = "";
                                            if(booking.event_where == "online") joinBtn = `<a href="${booking.event_link}" target="_blank" class="cal-event-cta">Join Call</a>`;
                                            box.classList.add("cal-box-event");
                                            box.innerHTML += `
                                                <i class="fa-solid fa-trash box-icon box-delete-icon"></i>
                                                <i class="fa-solid fa-pen-to-square box-icon box-edit-icon"></i>
                                                
                                                <div class="cal-event-head">${booking.title}</div>
                                                ${joinBtn}
                                            `;

                                            box.querySelector("i.box-delete-icon").addEventListener("click", () => {
                                                async function deleteEvent(){
                                                    const dataToSend = { id: booking.id };
                                                    try {
                                                        const response = await fetch(url + '/api/delete-event', {
                                                            method: 'POST',
                                                            credentials: 'include',
                                                            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                                'Content-Type': 'application/json', 
                                                            },
                                                            body: JSON.stringify(dataToSend), 
                                                        });

                                                        if (!response.ok) {
                                                            const errorData = await response.json();
                                                            console.error('Error:', errorData.message);
                                                            return;
                                                        }

                                                        const data = await response.json();
                                                        if(data.message == "success"){
                                                            createThank("The event has been deleted<br> successfully. Thank you!");
                                                        }
                                                    } catch (error) {
                                                        console.error('Error posting data:', error);
                                                    }
                                                }
                                                deleteEvent();
                                            });

                                            box.querySelector("i.box-edit-icon").addEventListener("click", () => {
                                                createEdit(booking);
                                            });
                                        }
                                    });
                                } else {
                                    box.classList.add("lac-day-disabled");
                                }
                            });

                            if(document.querySelector(".last-flex").querySelectorAll(".cal-day-disabled").length < 7){
                                document.querySelector(".last-flex").style.display = "flex";
                            } else {
                                document.querySelector(".last-flex").style.display = "none";
                            }
                        } catch (error) {
                            console.error('Error posting data:', error);
                        }
                    }
                    getBookings();
                }
                setCalendar(currentMonth, currentYear, true);
                function changeMonth(direction){
                    if(direction == "right"){
                        currentMonth++;
                    } else if(currentMonth > startPosition || Number(currentYear) > Number(startYear)){
                        currentMonth--;
                    }

                    if(currentMonth == 12){
                        currentMonth = 0;
                        currentYear = Number(currentYear) + 1;
                    } else if(currentMonth < 0) {
                        currentMonth = 11;
                        currentYear = Number(currentYear) - 1;
                    }
                    setCalendar(currentMonth, currentYear, false);
                }
                document.querySelectorAll("i.cal-nav-chevron").forEach((chev, idx) => {
                    if(idx == 0 || idx == 2){
                        chev.addEventListener("click", () => {
                            changeMonth("left");
                        });
                    } else {
                        chev.addEventListener("click", () => {
                            changeMonth("right");
                        });
                    }
                });
                function firstDay(monthIdx, yearStr) {
                    const date = new Date(parseInt(yearStr), monthIdx, 1);
                    let day = date.getDay() - 1;
                    if(day == -1){
                        return 6;
                    } else {
                        return day;
                    }
                }
                function totalDays(monthIdx, yearStr) {
                    const year = parseInt(yearStr);
                    return new Date(year, monthIdx + 1, 0).getDate();
                }

                function resetBoxes(){
                    document.querySelectorAll(".cal-box").forEach(box => {
                        box.classList.remove("cal-box-event");
                        box.classList.remove("cal-day-disabled");
                        box.classList.remove("cal-box-today");
                        box.innerHTML = `
                            <div class="cal-box-day"></div>
                        `
                    });
                    document.querySelectorAll(".lac-box").forEach(box => {
                        box.classList.remove("lac-box-event");
                        box.classList.remove("lac-day-disabled");
                        box.classList.remove("lac-box-today");
                        box.innerHTML = `
                            <div class="lac-box-day"></div>
                        `
                    });
                }
                function makeBoxToday(box){
                    if(box.classList.contains("cal-box")){
                        box.classList.add("cal-box-today");
                        box.innerHTML += `
                        <div class="cal-today-txt">Today</div>
                        `;
                    } else {
                        box.classList.add("lac-box-today");
                        box.innerHTML += `
                        <div class="lac-today-txt">Today</div>
                        `;    
                    }
                }
            }

            if(document.querySelector(".chat")){
                let firstCheck = true;
                function scrollBottom(){
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: "auto"
                    });
                }

                let allUsers;
                async function getAllUsers(){
                    try {
                        const response = await fetch(`${url}/api/get-all`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            },
                        });
                        const data = await response.json(); 
                        allUsers = data.users;
                        getChats();
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
                getAllUsers();

                async function getChats() {
                    try {
                        const response = await fetch(`${url}/api/get-chats`, {
                            method: 'GET',
                            headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                            credentials: 'include'
                        });
                        const data = await response.json();
                        const chats = data.chats; 
                        if(data.message == "success"){
                            let dates = [];
                            chats.forEach(chat => {
                                if(!dates.includes(chat.full_date)){
                                    dates.push(chat.full_date);
                                }
                            });

                            dates.forEach(date => {
                                chats.forEach(chat => {
                                    allUsers.forEach(user => {
                                        if(chat.full_date == date && !document.getElementById("msg-" + chat.id) && user.id == chat.user_id && chat.area == params.get("chat")){
                                            let newMsg = document.createElement("div");
                                            newMsg.classList.add("chat-msg");
                                            newMsg.id = "msg-" + chat.id;
                                            let adminText = "";
                                            if(user.perms == "admin") adminText = "(Admin)";
                                            newMsg.innerHTML = `
                                                <div class="chat-pfp">
                                                    <img src="${user.pfp}" />
                                                </div>
                                                <div>
                                                    <div class="chat-info">
                                                        <div class="chat-name">${user.name} ${adminText}</div>
                                                        <div class="chat-date">${chat.full_time}</div>
                                                    </div>
                                                    <div class="chat-para">${chat.message}</div>
                                                </div>
                                            `;
    
                                            if(document.getElementById("col-" + chat.full_date)){
                                                document.getElementById("col-" + chat.full_date).appendChild(newMsg);
                                            } else {
                                                let newCol = document.createElement("div");
                                                newCol.classList.add("chat-col");
                                                newCol.id = "col-" + chat.full_date;
                                                let dateTxt = chat.full_date;
                                                if(dateTxt == getCurrentDate()) dateTxt = "Today";
                                                newCol.innerHTML = `<div class="chat-hr"><span></span>${dateTxt}<span></span></div>`;
                                                newCol.appendChild(newMsg);
                                                document.querySelector(".chat-container").appendChild(newCol);
                                            }
                                        }
                                    });
                                });
                            });
                            if(firstCheck){
                                scrollBottom();
                                firstCheck = false;
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
                setInterval(getChats, 5000);

                async function sendChat(){
                    let message = document.getElementById("chatArea").value;
                    document.getElementById("chatArea").value = "";
                    if(message.value != ""){
                        const dataToSend = { message: message, area: params.get("chat") };
                        try {
                            const response = await fetch(url + '/api/send-chat', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    'Content-Type': 'application/json', 
                                },
                                body: JSON.stringify(dataToSend), 
                            });
                
                            if (!response.ok) {
                                const errorData = await response.json();
                                console.error('Error:', errorData.message);
                                return;
                            }
                
                            const data = await response.json();
                            if(data.message == "success"){
                                await getChats();
                                scrollBottom();
                            }
                        } catch (error) {
                            console.error('Error posting data:', error);
                        }
                    }
                }
                document.getElementById("chatArea").addEventListener("keydown", (e) => {
                    if(e.key.toLowerCase() == "enter" && document.getElementById("chatArea").value != ""){
                        e.preventDefault();
                        sendChat();
                    }
                });
                document.querySelector(".chat-arrow").addEventListener("click", () => {
                    if(document.getElementById("chatArea").value != ""){
                        sendChat();
                    }
                });;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    getUser();
}