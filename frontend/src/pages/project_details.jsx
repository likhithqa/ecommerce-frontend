import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ArrowLeft,
  MessageSquare,
  Paperclip,
  MoreVertical
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

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  color: #3b82f6;
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
  }
  
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

const ProjectHeader = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
`;

const ProjectTitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const ProjectStatus = styled.span`
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  background: ${props => props.$color};
  color: ${props => props.$textColor};
`;

const ProjectMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MetaIcon = styled.div`
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

const MetaContent = styled.div`
  flex: 1;
`;

const MetaLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
`;

const MetaValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
  animation-delay: ${props => props.$delay * 0.1}s;
  animation-fill-mode: both;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 16px;
`;

const ProgressSection = styled.div`
  margin-bottom: 24px;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ProgressLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
`;

const ProgressValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #1a1a1a 0%, #3b82f6 100%);
  border-radius: 4px;
  width: ${props => props.$percentage}%;
  transition: width 1s ease-out;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    transform: translateX(4px);
  }
`;

const TaskCheckbox = styled.input`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 4px;
  cursor: pointer;
`;

const TaskText = styled.span`
  flex: 1;
  font-size: 14px;
  color: #1e293b;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  opacity: ${props => props.$completed ? 0.6 : 1};
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    transform: translateX(4px);
  }
`;

const MemberAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 2px;
`;

const MemberRole = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    transform: translateX(4px);
  }
`;

const FileIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: #3b82f6;
  }
`;

const FileInfo = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 2px;
`;

const FileSize = styled.div`
  font-size: 12px;
  color: #64748b;
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

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [project, setProject] = useState({
    id: 1,
    name: 'Website Redesign',
    client: 'Tech Corp',
    status: 'in-progress',
    progress: 75,
    budget: 45000,
    deadline: '2024-07-15',
    team: 5,
    description: 'Complete redesign of the company website with modern UI/UX principles, responsive design, and improved performance optimization.',
    tasks: [
      { id: 1, text: 'Design system creation', completed: true },
      { id: 2, text: 'Homepage redesign', completed: true },
      { id: 3, text: 'Product pages development', completed: false },
      { id: 4, text: 'Mobile responsiveness', completed: false },
      { id: 5, text: 'Performance optimization', completed: false }
    ],
    teamMembers: [
      { id: 1, name: 'John Smith', role: 'Project Manager' },
      { id: 2, name: 'Sarah Johnson', role: 'Lead Designer' },
      { id: 3, name: 'Mike Wilson', role: 'Frontend Developer' },
      { id: 4, name: 'Emily Davis', role: 'Backend Developer' },
      { id: 5, name: 'David Brown', role: 'QA Engineer' }
    ],
    files: [
      { id: 1, name: 'Project_Brief.pdf', size: '2.4 MB' },
      { id: 2, name: 'Design_Mockups.fig', size: '15.8 MB' },
      { id: 3, name: 'Technical_Spec.docx', size: '1.2 MB' },
      { id: 4, name: 'Budget_Excel.xlsx', size: '856 KB' }
    ]
  });

  useEffect(() => {
    // Check if user is admin or manager, otherwise redirect to home page
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin' && userRole !== 'manager') {
      navigate('/');
      return;
    }

    // In a real app, you would fetch project data based on ID
    console.log('Loading project:', id);
  }, [navigate, id]);

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

  const statusColors = getStatusColor(project.status);

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
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
              <MobileMenuButton onClick={() => setSidebarOpen(true)}>
                <Menu />
              </MobileMenuButton>
              <BackButton onClick={() => navigate('/admin/projects')}>
                <ArrowLeft />
                Back to Projects
              </BackButton>
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
          {/* Project Header */}
          <ProjectHeader>
            <ProjectTitleSection>
              <ProjectTitle>{project.name}</ProjectTitle>
              <ProjectStatus $color={statusColors.color} $textColor={statusColors.textColor}>
                {project.status.replace('-', ' ')}
              </ProjectStatus>
            </ProjectTitleSection>
            
            <ProjectMeta>
              <MetaItem>
                <MetaIcon color="linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)">
                  <Users />
                </MetaIcon>
                <MetaContent>
                  <MetaLabel>Client</MetaLabel>
                  <MetaValue>{project.client}</MetaValue>
                </MetaContent>
              </MetaItem>
              
              <MetaItem>
                <MetaIcon color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                  <DollarSign />
                </MetaIcon>
                <MetaContent>
                  <MetaLabel>Budget</MetaLabel>
                  <MetaValue>${project.budget.toLocaleString()}</MetaValue>
                </MetaContent>
              </MetaItem>
              
              <MetaItem>
                <MetaIcon color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
                  <Calendar />
                </MetaIcon>
                <MetaContent>
                  <MetaLabel>Deadline</MetaLabel>
                  <MetaValue>{project.deadline}</MetaValue>
                </MetaContent>
              </MetaItem>
              
              <MetaItem>
                <MetaIcon color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
                  <Target />
                </MetaIcon>
                <MetaContent>
                  <MetaLabel>Team Size</MetaLabel>
                  <MetaValue>{project.team} members</MetaValue>
                </MetaContent>
              </MetaItem>
            </ProjectMeta>
          </ProjectHeader>

          {/* Content Grid */}
          <ContentGrid>
            {/* Main Content */}
            <MainContentSection>
              {/* Description */}
              <ContentCard $delay={0}>
                <CardTitle>Project Description</CardTitle>
                <Description>{project.description}</Description>
              </ContentCard>

              {/* Progress */}
              <ContentCard $delay={1}>
                <CardTitle>Overall Progress</CardTitle>
                <ProgressSection>
                  <ProgressHeader>
                    <ProgressLabel>Completion</ProgressLabel>
                    <ProgressValue>{project.progress}%</ProgressValue>
                  </ProgressHeader>
                  <ProgressBar>
                    <ProgressFill $percentage={project.progress} />
                  </ProgressBar>
                </ProgressSection>
              </ContentCard>

              {/* Tasks */}
              <ContentCard $delay={2}>
                <CardTitle>Tasks</CardTitle>
                <TaskList>
                  {project.tasks.map(task => (
                    <TaskItem key={task.id}>
                      <TaskCheckbox type="checkbox" checked={task.completed} readOnly />
                      <TaskText $completed={task.completed}>{task.text}</TaskText>
                    </TaskItem>
                  ))}
                </TaskList>
              </ContentCard>
            </MainContentSection>

            {/* Sidebar */}
            <SidebarSection>
              {/* Team */}
              <ContentCard $delay={3}>
                <CardTitle>Team Members</CardTitle>
                {project.teamMembers.map(member => (
                  <TeamMember key={member.id}>
                    <MemberAvatar>
                      <Users />
                    </MemberAvatar>
                    <MemberInfo>
                      <MemberName>{member.name}</MemberName>
                      <MemberRole>{member.role}</MemberRole>
                    </MemberInfo>
                  </TeamMember>
                ))}
              </ContentCard>

              {/* Files */}
              <ContentCard $delay={4}>
                <CardTitle>Files</CardTitle>
                {project.files.map(file => (
                  <FileItem key={file.id}>
                    <FileIcon>
                      <Paperclip />
                    </FileIcon>
                    <FileInfo>
                      <FileName>{file.name}</FileName>
                      <FileSize>{file.size}</FileSize>
                    </FileInfo>
                  </FileItem>
                ))}
              </ContentCard>
            </SidebarSection>
          </ContentGrid>
        </DashboardContent>
      </MainContent>

      {/* Mobile sidebar overlay */}
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
    </DashboardContainer>
  );
};

export default ProjectDetails;
