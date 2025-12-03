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
  X
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

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    justify-content: stretch;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.95);
  color: #1e293b;
  
  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease;
  animation-delay: ${props => props.$delay * 0.1}s;
  animation-fill-mode: both;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ProjectTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const ProjectStatus = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.$color};
  color: ${props => props.$textColor};
`;

const ProjectClient = styled.p`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
`;

const ProjectProgress = styled.div`
  margin-bottom: 16px;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ProgressLabel = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
`;

const ProgressValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.$color};
  border-radius: 3px;
  width: ${props => props.$percentage}%;
  transition: width 1s ease-out;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ViewButton = styled(ActionButton)`
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }
`;

const EditButton = styled(ActionButton)`
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  
  &:hover {
    background: rgba(245, 158, 11, 0.2);
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  
  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-1px);
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

const Projects = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Tech Corp',
      status: 'in-progress',
      progress: 75,
      budget: 45000,
      deadline: '2024-07-15',
      team: 5
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'Design Studio',
      status: 'in-progress',
      progress: 45,
      budget: 67000,
      deadline: '2024-08-30',
      team: 8
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      client: 'Marketing Pro',
      status: 'completed',
      progress: 100,
      budget: 23000,
      deadline: '2024-06-01',
      team: 3
    },
    {
      id: 4,
      name: 'Database Migration',
      client: 'Creative Agency',
      status: 'planning',
      progress: 10,
      budget: 35000,
      deadline: '2024-09-20',
      team: 4
    },
    {
      id: 5,
      name: 'E-commerce Platform',
      client: 'Startup Inc',
      status: 'in-progress',
      progress: 60,
      budget: 89000,
      deadline: '2024-07-30',
      team: 10
    },
    {
      id: 6,
      name: 'Brand Identity Design',
      client: 'Tech Corp',
      status: 'review',
      progress: 90,
      budget: 18000,
      deadline: '2024-06-25',
      team: 2
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'rgba(16, 185, 129, 0.1)', textColor: '#10b981' };
      case 'in-progress':
        return { color: 'rgba(59, 130, 246, 0.1)', textColor: '#3b82f6' };
      case 'planning':
        return { color: 'rgba(245, 158, 11, 0.1)', textColor: '#f59e0b' };
      case 'review':
        return { color: 'rgba(139, 92, 246, 0.1)', textColor: '#8b5cf6' };
      default:
        return { color: 'rgba(107, 114, 128, 0.1)', textColor: '#6b7280' };
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return '#10b981';
    if (progress >= 50) return '#3b82f6';
    if (progress >= 25) return '#f59e0b';
    return '#ef4444';
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'in-progress').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0)
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
                <SearchInput 
                  placeholder="Search projects..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
            <Title>Projects</Title>
            <Subtitle>Manage your projects and track their progress</Subtitle>
          </PageTitle>

          {/* Stats Cards */}
          <StatsGrid>
            <StatCard $delay={0}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)">
                  <FileText />
                </StatIcon>
                <StatChange $positive>+15%</StatChange>
              </StatHeader>
              <StatValue>{stats.totalProjects}</StatValue>
              <StatLabel>Total Projects</StatLabel>
            </StatCard>

            <StatCard $delay={1}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                  <Target />
                </StatIcon>
                <StatChange $positive>+3</StatChange>
              </StatHeader>
              <StatValue>{stats.activeProjects}</StatValue>
              <StatLabel>Active Projects</StatLabel>
            </StatCard>

            <StatCard $delay={2}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
                  <CheckCircle />
                </StatIcon>
                <StatChange $positive>+8</StatChange>
              </StatHeader>
              <StatValue>{stats.completedProjects}</StatValue>
              <StatLabel>Completed</StatLabel>
            </StatCard>

            <StatCard $delay={3}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
                  <DollarSign />
                </StatIcon>
                <StatChange $positive>+23%</StatChange>
              </StatHeader>
              <StatValue>${stats.totalBudget.toLocaleString()}</StatValue>
              <StatLabel>Total Budget</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* Actions Bar */}
          <ActionsBar>
            <ActionButtons>
              <PrimaryButton>
                <Plus />
                New Project
              </PrimaryButton>
              <SecondaryButton>
                <Download />
                Export
              </SecondaryButton>
            </ActionButtons>
            
            <FilterContainer>
              <FilterSelect 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="planning">Planning</option>
                <option value="review">Review</option>
              </FilterSelect>
            </FilterContainer>
          </ActionsBar>

          {/* Projects Grid */}
          <ProjectsGrid>
            {filteredProjects.map((project, index) => {
              const statusColors = getStatusColor(project.status);
              return (
                <ProjectCard 
                  key={project.id} 
                  $delay={index}
                  onClick={() => navigate(`/admin/projects/${project.id}`)}
                >
                  <ProjectHeader>
                    <ProjectTitle>{project.name}</ProjectTitle>
                    <ProjectStatus $color={statusColors.color} $textColor={statusColors.textColor}>
                      {project.status.replace('-', ' ')}
                    </ProjectStatus>
                  </ProjectHeader>
                  
                  <ProjectClient>Client: {project.client}</ProjectClient>
                  
                  <ProjectProgress>
                    <ProgressHeader>
                      <ProgressLabel>Progress</ProgressLabel>
                      <ProgressValue>{project.progress}%</ProgressValue>
                    </ProgressHeader>
                    <ProgressBar>
                      <ProgressFill $percentage={project.progress} $color={getProgressColor(project.progress)} />
                    </ProgressBar>
                  </ProjectProgress>
                  
                  <ProjectMeta>
                    <MetaItem>
                      <DollarSign />
                      ${project.budget.toLocaleString()}
                    </MetaItem>
                    <MetaItem>
                      <Calendar />
                      {project.deadline}
                    </MetaItem>
                    <MetaItem>
                      <Users />
                      {project.team} members
                    </MetaItem>
                  </ProjectMeta>
                  
                  <ProjectActions>
                    <ViewButton>
                      <Eye />
                    </ViewButton>
                    <EditButton>
                      <Edit />
                    </EditButton>
                    <DeleteButton>
                      <Trash2 />
                    </DeleteButton>
                  </ProjectActions>
                </ProjectCard>
              );
            })}
          </ProjectsGrid>
        </DashboardContent>
      </MainContent>

      {/* Mobile sidebar overlay */}
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
    </DashboardContainer>
  );
};

export default Projects;
