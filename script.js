document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const createAccountBtn = document.getElementById('createAccountBtn');
    const accountPage = document.getElementById('account-page');
    const createAccountOverlay = document.getElementById('createAccountOverlay');
    const closeOverlayBtn = document.getElementById('closeOverlayBtn');
    const profileOverlay = document.getElementById('profileOverlay');
    const closeProfileBtn = document.getElementById('closeProfileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const registerMemberBtn = document.getElementById('registerMemberBtn');
    const registerMemberOverlay = document.getElementById('registerMemberOverlay');
    const closeRegisterOverlayBtn = document.getElementById('closeRegisterOverlayBtn');

    // Dummy account and family member data
    const accounts = [
        { username: 'ebenezer', password: 'saludes' },
        { username: 'administrator', password: 'adminrjl' }
    ];
    const familyMembers = [
        {
            name: 'Romeo Duhaylungsod Lomoljo',
            age: 68,
            birthday: '1979-01-15',
            spouse: 'Jeanette Acut Lomoljo',
            mother: '',
            father: '',
            children: ['Hazel Lomoljo', 'Rogen Lomoljo', 'Lizel Lomoljo', 'Lynette Lomoljo']
        },
        {
            name: 'Jeanette Acut Lomoljo',
            age: 62,
            birthday: '1982-05-22',
            spouse: 'Romeo Duhaylungsod Lomoljo',
            mother: '',
            father: 'Maximiano Acut',
            children: ['Hazel Lomoljo', 'Rogen Lomoljo', 'Lizel Lomoljo', 'Lynette Lomoljo']
        },
        {
            name: 'Ebenezer Lomoljo Saludes',
            age: '26',
            birthday: '1998-07-01',
            spouse: '',
            mother: 'Hazel Acut Lomoljo',
            father: 'Jersom Ageas Saludes',
            children: ['']
        }
    ];

    // Load family members into the list
    function loadFamilyMembers() {
        const familyList = document.getElementById('family-list');
        familyList.innerHTML = '';
        familyMembers.forEach(member => {
            const li = document.createElement('li');
            li.textContent = member.name;
            li.setAttribute('data-member', JSON.stringify(member));
            familyList.appendChild(li);
        });
    }

    // Handle login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const accountExists = accounts.some(account => 
            account.username === username && account.password === password
        );

        if (accountExists) {
            document.getElementById('login-section').classList.add('hidden');
            accountPage.classList.remove('hidden');
            loadFamilyMembers();
        } else {
            alert('Invalid username or password!');
        }
    });

    // Show create account overlay
    createAccountBtn.addEventListener('click', () => {
        createAccountOverlay.style.display = 'flex';
    });

    // Close the create account overlay
    closeOverlayBtn.addEventListener('click', () => {
        createAccountOverlay.style.display = 'none';
    });

    // Handle create account form submission
    document.getElementById('createAccountForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Check if the username already exists
        const usernameExists = accounts.some(account => account.username === newUsername);

        if (usernameExists) {
            alert('Username already exists!');
        } else {
            // Add the new account to the system
            accounts.push({ username: newUsername, password: newPassword });
            alert('Account created successfully!');

            // Close the overlay after creating the account
            createAccountOverlay.style.display = 'none';
        }
    });

    // Optional: Close overlay when clicking outside the overlay content
    createAccountOverlay.addEventListener('click', (e) => {
        if (e.target === createAccountOverlay) {
            createAccountOverlay.style.display = 'none';
        }
    });

    // Show profile overlay
    document.getElementById('family-list').addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const memberData = JSON.parse(e.target.getAttribute('data-member'));
            const profileDetails = document.getElementById('profileDetails');
            profileDetails.innerHTML = `
                <p><strong>Name:</strong> ${memberData.name}</p>
                <p><strong>Age:</strong> ${memberData.age}</p>
                <p><strong>Birthday:</strong> ${memberData.birthday}</p>
                <p><strong>Spouse:</strong> ${memberData.spouse}</p>
                <p><strong>Mother:</strong> ${memberData.mother}</p>
                <p><strong>Father:</strong> ${memberData.father}</p>
                <p><strong>Children:</strong> ${memberData.children.join(', ')}</p>
            `;
            profileOverlay.style.display = 'flex';
        }
    });

    // Close the profile overlay
    closeProfileBtn.addEventListener('click', () => {
        profileOverlay.style.display = 'none';
    });

    // Show register new member overlay
    registerMemberBtn.addEventListener('click', () => {
        registerMemberOverlay.style.display = 'flex';
    });

    // Close the register new member overlay
    closeRegisterOverlayBtn.addEventListener('click', () => {
        registerMemberOverlay.style.display = 'none';
    });

    // Handle register new member form submission
    document.getElementById('registerMemberForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const memberName = document.getElementById('memberName').value;
        const memberAge = document.getElementById('memberAge').value;
        const memberBirthday = document.getElementById('memberBirthday').value;
        const memberSpouse = document.getElementById('memberSpouse').value;
        const memberMother = document.getElementById('memberMother').value;
        const memberFather = document.getElementById('memberFather').value;
        const memberChildren = document.getElementById('memberChildren').value.split(',').map(child => child.trim());

        // Add the new family member to the list
        familyMembers.push({
            name: memberName,
            age: parseInt(memberAge),
            birthday: memberBirthday,
            spouse: memberSpouse,
            mother: memberMother,
            father: memberFather,
            children: memberChildren
        });
        loadFamilyMembers();

        alert('Family member registered successfully!');

        // Close the overlay after registering the new member
        registerMemberOverlay.style.display = 'none';
    });

    // Logout button returns to homepage
    logoutBtn.addEventListener('click', () => {
        accountPage.classList.add('hidden');
        document.getElementById('login-section').classList.remove('hidden');
    });
});
