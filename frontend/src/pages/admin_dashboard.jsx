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
  Menu
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

const progressFill = keyframes`
  from {
    width: 0;
  }
  to {
    width: var(--progress-width);
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
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const PageTitle = styled.div`
  margin-bottom: 24px;
  animation: ${fadeIn} 0.6s ease;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease;
  animation-delay: ${props => props.$delay * 0.1}s;
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const StatChange = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$positive ? '#10b981' : '#ef4444'};
  background: ${props => props.$positive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  padding: 2px 8px;
  border-radius: 12px;
`;

const StatValue = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
`;

const StatLabel = styled.p`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const ChartTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
`;

const RevenueItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const RevenueLabel = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
`;

const RevenueBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 12px;
`;

const ProgressBar = styled.div`
  width: 80px;
  height: 6px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-right: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #1a1a1a 0%, #3b82f6 100%);
  border-radius: 3px;
  width: ${props => props.$percentage}%;
  animation: ${progressFill} 1s ease-out;
`;

const RevenueValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  min-width: 50px;
  text-align: right;
`;

const TaskItem = styled.div`
  margin-bottom: 16px;
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const TaskName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #1e293b;
`;

const TaskProgress = styled.span`
  font-size: 10px;
  color: #64748b;
  font-weight: 500;
`;

const TaskProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 2px;
`;

const TaskProgressFill = styled.div`
  height: 100%;
  background: ${props => props.$color};
  border-radius: 3px;
  width: ${props => props.$percentage}%;
  animation: ${progressFill} 1s ease-out;
`;

const TaskStatus = styled.span`
  font-size: 10px;
  color: #64748b;
`;

const DeadlinesCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

const DeadlinesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ViewAllButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #1a1a1a;
    transform: translateX(2px);
  }
`;

const DeadlineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    transform: translateX(2px);
  }
`;

const DeadlineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DeadlineIcon = styled.div`
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

const DeadlineDetails = styled.div`
  h3 {
    font-size: 12px;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 2px;
  }
  
  p {
    font-size: 10px;
    color: #64748b;
  }
`;

const PriorityBadge = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
  background: ${props => props.$color};
  color: ${props => props.$textColor};
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalClients: 1234,
    activeProjects: 42,
    totalRevenue: 89750,
    pendingInvoices: 18
  });
  const [monthlyRevenue] = useState([
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 78000 },
    { month: 'Mar', revenue: 82000 },
    { month: 'Apr', revenue: 91000 },
    { month: 'May', revenue: 89750 },
    { month: 'Jun', revenue: 95000 }
  ]);
  const [tasks] = useState([
    { name: 'Website Redesign', progress: 75, status: 'In Progress' },
    { name: 'Mobile App Development', progress: 45, status: 'In Progress' },
    { name: 'Marketing Campaign', progress: 90, status: 'Almost Done' },
    { name: 'Database Migration', progress: 100, status: 'Completed' }
  ]);
  const [deadlines] = useState([
    { title: 'Q2 Financial Report', date: '2024-06-30', priority: 'High' },
    { title: 'Product Launch', date: '2024-07-15', priority: 'High' },
    { title: 'Team Meeting', date: '2024-06-25', priority: 'Medium' },
    { title: 'Client Presentation', date: '2024-07-01', priority: 'Medium' }
  ]);

  useEffect(() => {
    // Check if user is admin or manager, otherwise redirect to home page
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin' && userRole !== 'manager') {
      navigate('/');
      return;
    }

    // Fetch dashboard data
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard/');
      const data = await response.json();
      if (data.success) {
        setStats({
          totalClients: data.content.stats.total_users || 1234,
          activeProjects: data.content.stats.total_products || 42,
          totalRevenue: data.content.stats.total_orders * 100 || 89750,
          pendingInvoices: 18
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return '#10b981';
    if (progress >= 50) return '#3b82f6';
    if (progress >= 25) return '#f59e0b';
    return '#ef4444';
  };

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
                <SearchInput placeholder="Search..." />
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
            <Title>Dashboard Overview</Title>
            <Subtitle>Welcome back! Here's what's happening with your business today.</Subtitle>
          </PageTitle>

          {/* Stats Cards */}
          <StatsGrid>
            <StatCard $delay={0}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)">
                  <Users />
                </StatIcon>
                <StatChange $positive>+12%</StatChange>
              </StatHeader>
              <StatValue>{stats.totalClients.toLocaleString()}</StatValue>
              <StatLabel>Total Clients</StatLabel>
            </StatCard>

            <StatCard $delay={1}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                  <FileText />
                </StatIcon>
                <StatChange $positive>+8%</StatChange>
              </StatHeader>
              <StatValue>{stats.activeProjects}</StatValue>
              <StatLabel>Active Projects</StatLabel>
            </StatCard>

            <StatCard $delay={2}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
                  <DollarSign />
                </StatIcon>
                <StatChange $positive>+23%</StatChange>
              </StatHeader>
              <StatValue>${stats.totalRevenue.toLocaleString()}</StatValue>
              <StatLabel>Total Revenue</StatLabel>
            </StatCard>

            <StatCard $delay={3}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
                  <Calendar />
                </StatIcon>
                <StatChange $positive>+3</StatChange>
              </StatHeader>
              <StatValue>{stats.pendingInvoices}</StatValue>
              <StatLabel>Pending Invoices</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* Charts and Progress Section */}
          <ChartsGrid>
            {/* Monthly Revenue Chart */}
            <ChartCard>
              <ChartTitle>Monthly Revenue</ChartTitle>
              {monthlyRevenue.map((month, index) => (
                <RevenueItem key={index}>
                  <RevenueLabel>{month.month}</RevenueLabel>
                  <RevenueBar>
                    <ProgressBar>
                      <ProgressFill $percentage={(month.revenue / 100000) * 100} />
                    </ProgressBar>
                    <RevenueValue>${month.revenue.toLocaleString()}</RevenueValue>
                  </RevenueBar>
                </RevenueItem>
              ))}
            </ChartCard>

            {/* Task Progress */}
            <ChartCard>
              <ChartTitle>Task Progress</ChartTitle>
              {tasks.map((task, index) => (
                <TaskItem key={index}>
                  <TaskHeader>
                    <TaskName>{task.name}</TaskName>
                    <TaskProgress>{task.progress}%</TaskProgress>
                  </TaskHeader>
                  <TaskProgressBar>
                    <TaskProgressFill 
                      $percentage={task.progress}
                      $color={getProgressColor(task.progress)}
                    />
                  </TaskProgressBar>
                  <TaskStatus>{task.status}</TaskStatus>
                </TaskItem>
              ))}
            </ChartCard>
          </ChartsGrid>

          {/* Upcoming Deadlines */}
          <DeadlinesCard>
            <DeadlinesHeader>
              <ChartTitle>Upcoming Deadlines</ChartTitle>
              <ViewAllButton>View All</ViewAllButton>
            </DeadlinesHeader>
            {deadlines.map((deadline, index) => (
              <DeadlineItem key={index}>
                <DeadlineInfo>
                  <DeadlineIcon>
                    <Calendar />
                  </DeadlineIcon>
                  <DeadlineDetails>
                    <h3>{deadline.title}</h3>
                    <p>{deadline.date}</p>
                  </DeadlineDetails>
                </DeadlineInfo>
                <PriorityBadge
                  $color={
                    deadline.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 
                    deadline.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 
                    'rgba(16, 185, 129, 0.1)'
                  }
                  $textColor={
                    deadline.priority === 'High' ? '#ef4444' : 
                    deadline.priority === 'Medium' ? '#f59e0b' : 
                    '#10b981'
                  }
                >
                  {deadline.priority}
                </PriorityBadge>
              </DeadlineItem>
            ))}
          </DeadlinesCard>
        </DashboardContent>
      </MainContent>

      {/* Mobile sidebar overlay */}
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
    </DashboardContainer>
  );
};

export default AdminDashboard;
