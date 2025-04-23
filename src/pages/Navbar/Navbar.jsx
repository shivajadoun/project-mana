import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '@/components/ui/dialog';
import CreateProjectForm from '../Project/CreateProjectForm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/Redux/Auth/Action';

const Navbar = () => {
    const {auth }= useSelector(state => state);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogOut= ()=>{
        dispatch(logout())
    }
  return (
    <div className='border-b py-4 px-5 flex items-center justify-between bg-black text-gray-500'>
      <div className='flex items-center gap-3'>
        <p  onClick={()=>navigate("/")} className='cursor-pointer'>Project Management</p>

        <Dialog>
          <DialogTrigger>
            <Button variant="ghost" className='text-gray-500'>New Project</Button>
          </DialogTrigger>
          <DialogContent className='bg-black text-gray-500'>
            <DialogHeader>Create New Project</DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button variant="ghost" className='text-gray-500' onClick={()=>navigate("/upgrade_plan")}>Upgrade</Button>
      </div>
      <div className='flex gap-3 items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className=' rounded-full border-2 border-gray-500 bg-black'>
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-black text-gray-500'>
            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className='text-gray-500'>{auth.user.fullName}</p>
      </div>
    </div>
  );
};

export default Navbar;
