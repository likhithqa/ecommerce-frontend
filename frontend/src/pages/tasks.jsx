import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  Users, 
  DollarSign,
  BarChart3,
  FileText,
  Calendar,
  Bell,
  Search,
  LogOut,
  Menu,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  X,
  CheckSquare,
  Square,
  MoreVertical,
  ChevronDown,
  Calendar as CalendarIcon,
  User,
  Tag
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 0;
  
  @media (min-width: 1024px) {
    margin-left: 0px;
  }
`;

const TopHeader = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 36px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NotificationButton = styled.button`
  position: relative;
  padding: 8px;
  border: none;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }
  
  svg {
    width: 18px;
    height: 18px;
    color: #3b82f6;
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  background: #ef4444;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const UserProfile = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: none;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
    color: white;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  color: #1e293b;
  font-size: 14px;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

const DashboardContent = styled.main`
  padding: 16px;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const PageTitle = styled.div`
  margin-bottom: 16px;
  animation: ${fadeIn} 0.6s ease;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const TaskBoard = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 16px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TaskSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const TaskMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TaskSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
  animation-delay: ${props => props.$delay * 0.1}s;
  animation-fill-mode: both;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    transform: translateX(2px);
  }
`;

const TaskCheckbox = styled.button`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 3px;
  background: ${props => props.$checked ? 'linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)' : 'transparent'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-top: 2px;
  flex-shrink: 0;
  
  svg {
    width: 10px;
    height: 10px;
    color: white;
    opacity: ${props => props.$checked ? 1 : 0};
  }
`;

const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 6px;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  opacity: ${props => props.$completed ? 0.6 : 1};
  line-height: 1.3;
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const TaskMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #64748b;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const TaskPriority = styled.span`
  padding: 1px 6px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  background: ${props => props.$color};
  color: ${props => props.$textColor};
`;

const TaskActions = styled.button`
  padding: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
  
  ${TaskItem}:hover & {
    opacity: 1;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #64748b;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FilterLabel = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FilterOption = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  color: #1e293b;
  text-align: left;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
  }
  
  ${props => props.$active && `
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    font-weight: 500;
  `}
`;

const FilterCount = styled.span`
  margin-left: auto;
  font-size: 10px;
  color: #64748b;
  background: rgba(107, 114, 128, 0.1);
  padding: 1px 4px;
  border-radius: 8px;
`;

const AddTaskButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border: 2px dashed rgba(59, 130, 246, 0.3);
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  color: #3b82f6;
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(59, 130, 246, 0.05);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  padding: 8px;
  border: none;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 1023px) {
    display: block;
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
  }
  
  svg {
    width: 18px;
    height: 18px;
    color: #3b82f6;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: ${props => props.$show ? 'block' : 'none'};
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease;
  
  @media (max-width: 640px) {
    padding: 24px;
    margin: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const CloseModalButton = styled.button`
  padding: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: #64748b;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: white;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 2px solid rgba(107, 114, 128, 0.2);
  background: white;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(107, 114, 128, 0.3);
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  border: none;
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  color: white;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  }
`;

const Tasks = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    project: ''
  });
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design system creation',
      completed: false,
      priority: 'high',
      dueDate: '2024-07-15',
      assignee: 'John Smith',
      project: 'Website Redesign'
    },
    {
      id: 2,
      title: 'Homepage redesign',
      completed: true,
      priority: 'medium',
      dueDate: '2024-07-10',
      assignee: 'Sarah Johnson',
      project: 'Website Redesign'
    },
    {
      id: 3,
      title: 'Product pages development',
      completed: false,
      priority: 'high',
      dueDate: '2024-07-20',
      assignee: 'Mike Wilson',
      project: 'Website Redesign'
    },
    {
      id: 4,
      title: 'Mobile responsiveness',
      completed: false,
      priority: 'medium',
      dueDate: '2024-07-25',
      assignee: 'Emily Davis',
      project: 'Website Redesign'
    },
    {
      id: 5,
      title: 'Performance optimization',
      completed: false,
      priority: 'low',
      dueDate: '2024-07-30',
      assignee: 'David Brown',
      project: 'Website Redesign'
    },
    {
      id: 6,
      title: 'API integration',
      completed: true,
      priority: 'high',
      dueDate: '2024-07-08',
      assignee: 'John Smith',
      project: 'Mobile App'
    },
    {
      id: 7,
      title: 'User authentication',
      completed: false,
      priority: 'high',
      dueDate: '2024-07-18',
      assignee: 'Sarah Johnson',
      project: 'Mobile App'
    },
    {
      id: 8,
      title: 'Database design',
      completed: true,
      priority: 'medium',
      dueDate: '2024-07-05',
      assignee: 'Mike Wilson',
      project: 'E-commerce Platform'
    }
  ]);

  useEffect(() => {
    // Check if user is admin or manager, otherwise redirect to home page
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin' && userRole !== 'manager') {
      navigate('/');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      title: formData.title,
      completed: false,
      priority: formData.priority,
      dueDate: formData.dueDate,
      assignee: formData.assignee,
      project: formData.project
    };
    setTasks([...tasks, newTask]);
    setShowAddModal(false);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignee: '',
      project: ''
    });
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'rgba(239, 68, 68, 0.1)', textColor: '#ef4444' };
      case 'medium':
        return { color: 'rgba(245, 158, 11, 0.1)', textColor: '#f59e0b' };
      case 'low':
        return { color: 'rgba(16, 185, 129, 0.1)', textColor: '#10b981' };
      default:
        return { color: 'rgba(107, 114, 128, 0.1)', textColor: '#6b7280' };
    }
  };

  const getFilteredTasks = () => {
    switch (selectedFilter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'high':
        return tasks.filter(task => task.priority === 'high');
      case 'medium':
        return tasks.filter(task => task.priority === 'medium');
      case 'low':
        return tasks.filter(task => task.priority === 'low');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <MainContent>
        {/* Top Header */}
        <TopHeader>
          <HeaderContainer>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <MobileMenuButton onClick={() => setSidebarOpen(true)}>
                <Menu />
              </MobileMenuButton>
              <SearchContainer>
                <SearchIcon>
                  <Search />
                </SearchIcon>
                <SearchInput placeholder="Search tasks..." />
              </SearchContainer>
            </div>
            
            <HeaderActions>
              <NotificationButton>
                <Bell />
                <NotificationDot />
              </NotificationButton>
              <UserProfile onClick={handleLogout}>
                <UserAvatar>
                  <Users />
                </UserAvatar>
                <UserName>Admin</UserName>
                <LogOut />
              </UserProfile>
            </HeaderActions>
          </HeaderContainer>
        </TopHeader>

        {/* Dashboard Content */}
        <DashboardContent>
          {/* Page Title */}
          <PageTitle>
            <Title>Tasks</Title>
            <Subtitle>Manage and track all your tasks in one place</Subtitle>
          </PageTitle>

          {/* Task Board */}
          <TaskBoard>
            {/* Task Sidebar */}
            <TaskSidebar>
              <TaskSection $delay={0}>
                <FilterGroup>
                  <FilterLabel>Filter</FilterLabel>
                  <FilterOptions>
                    <FilterOption 
                      $active={selectedFilter === 'all'}
                      onClick={() => setSelectedFilter('all')}
                    >
                      All Tasks
                      <FilterCount>{tasks.length}</FilterCount>
                    </FilterOption>
                    <FilterOption 
                      $active={selectedFilter === 'active'}
                      onClick={() => setSelectedFilter('active')}
                    >
                      Active
                      <FilterCount>{tasks.filter(t => !t.completed).length}</FilterCount>
                    </FilterOption>
                    <FilterOption 
                      $active={selectedFilter === 'completed'}
                      onClick={() => setSelectedFilter('completed')}
                    >
                      Completed
                      <FilterCount>{tasks.filter(t => t.completed).length}</FilterCount>
                    </FilterOption>
                  </FilterOptions>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel>Priority</FilterLabel>
                  <FilterOptions>
                    <FilterOption 
                      $active={selectedFilter === 'high'}
                      onClick={() => setSelectedFilter('high')}
                    >
                      High Priority
                      <FilterCount>{tasks.filter(t => t.priority === 'high').length}</FilterCount>
                    </FilterOption>
                    <FilterOption 
                      $active={selectedFilter === 'medium'}
                      onClick={() => setSelectedFilter('medium')}
                    >
                      Medium Priority
                      <FilterCount>{tasks.filter(t => t.priority === 'medium').length}</FilterCount>
                    </FilterOption>
                    <FilterOption 
                      $active={selectedFilter === 'low'}
                      onClick={() => setSelectedFilter('low')}
                    >
                      Low Priority
                      <FilterCount>{tasks.filter(t => t.priority === 'low').length}</FilterCount>
                    </FilterOption>
                  </FilterOptions>
                </FilterGroup>

                <AddTaskButton onClick={() => setShowAddModal(true)}>
                  <Plus />
                  Add New Task
                </AddTaskButton>
              </TaskSection>
            </TaskSidebar>

            {/* Task Main Content */}
            <TaskMain>
              <TaskSection $delay={1}>
                <SectionHeader>
                  <SectionTitle>Tasks ({filteredTasks.length})</SectionTitle>
                </SectionHeader>
                
                <TaskList>
                  {filteredTasks.map(task => {
                    const priorityColors = getPriorityColor(task.priority);
                    return (
                      <TaskItem key={task.id}>
                        <TaskCheckbox 
                          $checked={task.completed}
                          onClick={() => toggleTaskComplete(task.id)}
                        >
                          <CheckSquare />
                        </TaskCheckbox>
                        
                        <TaskContent>
                          <TaskTitle $completed={task.completed}>
                            {task.title}
                          </TaskTitle>
                          
                          <TaskMeta>
                            <TaskMetaItem>
                              <CalendarIcon />
                              {task.dueDate}
                            </TaskMetaItem>
                            <TaskMetaItem>
                              <User />
                              {task.assignee}
                            </TaskMetaItem>
                            <TaskMetaItem>
                              <Tag />
                              {task.project}
                            </TaskMetaItem>
                            <TaskPriority $color={priorityColors.color} $textColor={priorityColors.textColor}>
                              {task.priority}
                            </TaskPriority>
                          </TaskMeta>
                        </TaskContent>
                        
                        <TaskActions>
                          <MoreVertical />
                        </TaskActions>
                      </TaskItem>
                    );
                  })}
                </TaskList>
              </TaskSection>
            </TaskMain>
          </TaskBoard>
        </DashboardContent>
      </MainContent>

      {/* Mobile sidebar overlay */}
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      {/* Add Task Modal */}
      <ModalOverlay $show={showAddModal}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Add New Task</ModalTitle>
            <CloseModalButton onClick={() => setShowAddModal(false)}>
              <X />
            </CloseModalButton>
          </ModalHeader>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Task Title *</FormLabel>
              <FormInput
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Priority</FormLabel>
              <FormSelect
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Due Date</FormLabel>
              <FormInput
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Assignee</FormLabel>
              <FormInput
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
                placeholder="Enter assignee name"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Project</FormLabel>
              <FormInput
                type="text"
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                placeholder="Enter project name"
              />
            </FormGroup>

            <FormButtons>
              <CancelButton type="button" onClick={() => setShowAddModal(false)}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit">
                Add Task
              </SubmitButton>
            </FormButtons>
          </form>
        </ModalContainer>
      </ModalOverlay>
    </DashboardContainer>
  );
};

export default Tasks;
