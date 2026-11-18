import { getMyTuitions } from '@/lib/api/tuitons.';


const MyTuitionsPage = async() => {
   const result =  await getMyTuitions();
   
   console.log(result);
    return (
        <div>
            
        </div>
    );
};

export default MyTuitionsPage;
