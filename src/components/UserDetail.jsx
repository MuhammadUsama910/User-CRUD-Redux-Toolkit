import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserById } from '../features/users/userSlice';
import { useParams } from 'react-router-dom';

const UserDetail = () => {

  const { id } = useParams();
  // const dispatch = useDispatch();

  const user = useSelector((state) => state.users.find((user) => user.id === id));
  // const status = useSelector((state) => state.status);
  // const error = useSelector((state) => state.error);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUserById(userId));
  //   }
  // }, [dispatch, userId]);

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (status === 'failed') {
  //   return <div>{error}</div>;
  // }

  return (
    <div className="w-1/3 m-auto mt-4 p-8 rounded shadow-lg">
      <h2 className="text-2xl text-blue-500 text-center font-semibold mb-4"> User Details </h2>
      {user ? (
        <>
        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> ID: </strong> </p> 
          <p className='w-1/2'> {user.id} </p>
        </div>

        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> Name: </strong> </p> 
          <p className='w-1/2'> {user.name} </p>
        </div>

        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> Email: </strong> </p> 
          <p className='w-1/2'> {user.email} </p>
        </div>

        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> Profession: </strong> </p> 
          <p className='w-1/2'> {user.profession} </p>
        </div>

        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> Gender: </strong> </p> 
          <p className='w-1/2'> {user.gender} </p>
        </div>

        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> City: </strong> </p> 
          <p className='w-1/2'> {user.address.city} </p>
        </div>

        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> Street: </strong> </p> 
          <p className='w-1/2'> {user.address.street} </p>
        </div>

        <div className='w-full my-1 flex items-center'>
          <p className='w-1/4'><strong> House: </strong> </p> 
          <p className='w-1/2'> {user.address.house} </p>
        </div>
          
          
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetail;
