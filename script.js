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
            children: [ 'Hazel Lomoljo', 'Rogen Lomoljo', 'Lizel Lomoljo', 'Lynette Lomoljo'
                      ]
        },
        {
                name: 'Hazel Acut Lomoljo',
                age: '',
                birthday: '',
                spouse: 'Robie Lumayno Galdiano Sr.',
                mother: 'Jeanette Acut Lomoljo',
                father: 'Romeo Duhaylungsod Lomoljo',
                children: [
                    'Ebenezer Lomoljo Saldues',
                    'Willy Lomoljo Simon',
                    'Rubzel Dave Lomoljo Galdiano',
                    'Ruzel Ken Lomoljo Galdiano',
                    'Goldie Love Lomoljo Galdiano',
                    'Lady Fair Lomoljo Galdiano',
                    'Ruby Grace Lomoljo Galdiano',
                    'Robie Lomoljo Galdiano Jr.',
                    'Crystal Shine Lomoljo Galdiano'
                ]
        },
        {
                name: 'Rogen Acut Lomoljo',
                age: '',
                birthday: '',
                spouse: 'Pinky Delos Reyes Lomoljo',
                mother: 'Jeanette Acut Lomoljo',
                father: 'Romeo Duhaylungsod Lomoljo',
                children: [
                    'Jhon Kenjie Delos Reyes Lomoljo',
                    'Hannamichi jeanky Delos Reyes Lomoljo',
                    'Kydie Joren Delos Reyes Lomoljo',
                    'Zeth Delos Reyes Lomoljo',
                ]
        },
        {
                name: 'Lizel Acut Lomoljo',
                age: '',
                birthday: '',
                spouse: 'Ronald Sisa',
                mother: 'Jeanette Acut Lomoljo',
                father: 'Romeo Duhaylungsod Lomoljo',
                children: [
                    'Kirby Jan Lomoljo Sisa',
                    'Shower Faith Lomoljo Sisa',
                    'Lody Hope Lomoljo Sisa',
                ]
        },
        {
                name: 'Lynette Acut Lomoljo Aboria',
                age: '',
                birthday: '',
                spouse: 'Rolly Alboria Sr.',
                mother: 'Jeanette Acut Lomoljo',
                father: 'Romeo Duhaylungsod Lomoljo',
                children: [
                    'Rolly Lomoljo Alboria Jr.',
                    'Rexon Lomoljo Alboria',
                    'Twinkle Lomoljo Alboria',
                ]
        },
        {
            name: 'Ebenezer Lomoljo Saludes',
            age: '26',
            birthday: '1998-07-01',
            spouse: '',
            mother: 'Hazel Acut Lomoljo',
            father: 'Jersom Ageas Saludes',
            children: ['']
        },
        {
            name: 'Willy Lomoljo Simon',
            age: '',
            birthday: '',
            spouse: '',
            mother: 'Hazel Acut Lomoljo Galdiano',
            father: '',
            children: [''],
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
