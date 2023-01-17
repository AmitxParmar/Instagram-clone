import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header';
import UserProfile from '../components/profile';
import * as ROUTES from '../constants/Routes';
import { getUserByUserName } from '../services/Firebase';

const Profile = () => {
    const { userName } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUserExists() {

            await getUserByUserName(userName)
                .then((user) => {
                    if (user?.userId) {
                        setUser(user);
                    } else {
                        navigate(ROUTES.NOT_FOUND);
                    }
                });
        }
        checkUserExists();
    }, [userName, navigate]);

    return user && (
        <div className="bg-gray-background capitalize border-black-faded">
            <Header />
            <div className="mx-auto py-6 max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    );
};

export default Profile;
