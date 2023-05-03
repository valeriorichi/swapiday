const testedUser = {
    username: 'testedUser1',
    name: 'Linda',
    surname: 'Johnson',
    houseImage: [
        require("./tested_data/London_1/data1_0.jpg"),
        require("./tested_data/London_1/data1_1.jpg"),
        require("./tested_data/London_1/data1_2.jpg"),
    ],
    userImage: [
        require("./tested_data/User_1/1.jpg"),
    ],
    houseLocation: 'Camden Town, London, UK',
    houseHeaderInfo: 'Cosy flat in Camden Town',
    houseInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada nunc vel risus commodo viverra maecenas. Mus mauris vitae ultricies leo integer malesuada nunc vel. Volutpat est velit egestas dui id ornare. Et malesuada fames ac turpis egestas integer eget aliquet nibh. In massa tempor nec feugiat nisl pretium fusce. Fermentum dui faucibus in ornare quam. Neque laoreet suspendisse interdum consectetur. Sed libero enim sed faucibus turpis in eu mi bibendum. Et ultrices neque ornare aenean euismod elementum. Quisque id diam vel quam elementum pulvinar.",
    comments: {
        rating: 4.85,
        review: 17
    },

    available_dates: [
        { from: "15 May 2023", to: "25 May 2023" },
        { from: "23 June 2023", to: "10 July 2023" },
    ]


};

export default testedUser;

