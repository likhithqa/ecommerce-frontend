import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  Users, 
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Shield,
  Clock,
  CheckCircle,
  X,
  Star,
  Target,
  BarChart3,
  DollarSign,
  Activity
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

const CardStatIcon = styled.div`
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

const CardStatChange = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$positive ? '#10b981' : '#ef4444'};
  background: ${props => props.$positive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  padding: 2px 8px;
  border-radius: 12px;
`;

const CardStatValue = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
`;

const CardStatLabel = styled.p`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 0.6s ease;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const TeamMemberCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MemberAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const MemberDetails = styled.div`
  flex: 1;
`;

const MemberName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const MemberRole = styled.p`
  font-size: 14px;
  color: #64748b;
`;

const MemberActions = styled.div`
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

const MemberStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MemberStatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  
  svg {
    width: 16px;
    height: 16px;
    color: white;
  }
`;

const MemberStatInfo = styled.div`
  flex: 1;
`;

const MemberStatValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`;

const MemberStatLabel = styled.div`
  font-size: 12px;
  color: #64748b;
`;

const MemberContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #64748b;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
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

const TeamManagement = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Project Manager',
      department: 'Management',
      email: 'sarah.j@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      status: 'active',
      projectsCompleted: 24,
      ongoingProjects: 3,
      performance: 95,
      joinDate: '2022-03-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'michael.c@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      status: 'active',
      projectsCompleted: 18,
      ongoingProjects: 2,
      performance: 92,
      joinDate: '2021-07-22'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'UX Designer',
      department: 'Design',
      email: 'emily.d@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      status: 'active',
      projectsCompleted: 15,
      ongoingProjects: 4,
      performance: 88,
      joinDate: '2022-01-10'
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Marketing Lead',
      department: 'Marketing',
      email: 'james.w@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      status: 'active',
      projectsCompleted: 20,
      ongoingProjects: 2,
      performance: 90,
      joinDate: '2021-11-05'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Sales Manager',
      department: 'Sales',
      email: 'lisa.a@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      status: 'on-leave',
      projectsCompleted: 12,
      ongoingProjects: 0,
      performance: 85,
      joinDate: '2022-05-18'
    },
    {
      id: 6,
      name: 'David Martinez',
      role: 'Backend Developer',
      department: 'Engineering',
      email: 'david.m@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Seattle, WA',
      status: 'active',
      projectsCompleted: 16,
      ongoingProjects: 3,
      performance: 87,
      joinDate: '2021-09-30'
    }
  ]);

  useEffect(() => {
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
      case 'active':
        return { color: 'rgba(16, 185, 129, 0.1)', textColor: '#10b981' };
      case 'on-leave':
        return { color: 'rgba(245, 158, 11, 0.1)', textColor: '#f59e0b' };
      case 'inactive':
        return { color: 'rgba(239, 68, 68, 0.1)', textColor: '#ef4444' };
      default:
        return { color: 'rgba(107, 114, 128, 0.1)', textColor: '#6b7280' };
    }
  };

  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const stats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === 'active').length,
    departments: [...new Set(teamMembers.map(m => m.department))].length,
    avgPerformance: Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length)
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
                <Users />
              </MobileMenuButton>
              <SearchContainer>
                <SearchIcon>
                  <Search />
                </SearchIcon>
                <SearchInput 
                  placeholder="Search team members..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchContainer>
            </div>
            
            <HeaderActions>
              <NotificationButton>
                <Users />
                <NotificationDot />
              </NotificationButton>
              <UserProfile onClick={handleLogout}>
                <UserAvatar>
                  <Users />
                </UserAvatar>
                <UserName>Admin</UserName>
                <X />
              </UserProfile>
            </HeaderActions>
          </HeaderContainer>
        </TopHeader>

        {/* Dashboard Content */}
        <DashboardContent>
          {/* Page Title */}
          <PageTitle>
            <Title>Team Management</Title>
            <Subtitle>Manage your team members and track performance</Subtitle>
          </PageTitle>

          {/* Stats Cards */}
          <StatsGrid>
            <StatCard $delay={0}>
              <StatHeader>
                <CardStatIcon color="linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)">
                  <Users />
                </CardStatIcon>
                <CardStatChange $positive>+2</CardStatChange>
              </StatHeader>
              <CardStatValue>{stats.totalMembers}</CardStatValue>
              <CardStatLabel>Total Members</CardStatLabel>
            </StatCard>

            <StatCard $delay={1}>
              <StatHeader>
                <CardStatIcon color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                  <CheckCircle />
                </CardStatIcon>
                <CardStatChange $positive>+1</CardStatChange>
              </StatHeader>
              <CardStatValue>{stats.activeMembers}</CardStatValue>
              <CardStatLabel>Active Members</CardStatLabel>
            </StatCard>

            <StatCard $delay={2}>
              <StatHeader>
                <CardStatIcon color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
                  <Briefcase />
                </CardStatIcon>
                <CardStatChange $positive>0</CardStatChange>
              </StatHeader>
              <CardStatValue>{stats.departments}</CardStatValue>
              <CardStatLabel>Departments</CardStatLabel>
            </StatCard>

            <StatCard $delay={3}>
              <StatHeader>
                <CardStatIcon color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
                  <TrendingUp />
                </CardStatIcon>
                <CardStatChange $positive>+3%</CardStatChange>
              </StatHeader>
              <CardStatValue>{stats.avgPerformance}%</CardStatValue>
              <CardStatLabel>Avg Performance</CardStatLabel>
            </StatCard>
          </StatsGrid>

          {/* Actions Bar */}
          <ActionsBar>
            <ActionButtons>
              <PrimaryButton>
                <UserPlus />
                Add Team Member
              </PrimaryButton>
              <SecondaryButton>
                <Filter />
                Export Team
              </SecondaryButton>
            </ActionButtons>
            
            <FilterContainer>
              <FilterSelect 
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Management">Management</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </FilterSelect>
            </FilterContainer>
          </ActionsBar>

          {/* Team Members Grid */}
          <TeamGrid>
            {filteredTeamMembers.map((member) => {
              const statusColors = getStatusColor(member.status);
              return (
                <TeamMemberCard key={member.id}>
                  <MemberHeader>
                    <MemberInfo>
                      <MemberAvatar>
                        <Users />
                      </MemberAvatar>
                      <MemberDetails>
                        <MemberName>{member.name}</MemberName>
                        <MemberRole>{member.role}</MemberRole>
                      </MemberDetails>
                    </MemberInfo>
                    <MemberActions>
                      <ViewButton>
                        <Eye />
                      </ViewButton>
                      <EditButton>
                        <Edit />
                      </EditButton>
                      <DeleteButton>
                        <Trash2 />
                      </DeleteButton>
                    </MemberActions>
                  </MemberHeader>

                  <MemberStats>
                    <StatItem>
                      <MemberStatIcon color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                        <CheckCircle />
                      </MemberStatIcon>
                      <MemberStatInfo>
                        <MemberStatValue>{member.projectsCompleted}</MemberStatValue>
                        <MemberStatLabel>Completed</MemberStatLabel>
                      </MemberStatInfo>
                    </StatItem>
                    <StatItem>
                      <MemberStatIcon color="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)">
                        <Activity />
                      </MemberStatIcon>
                      <MemberStatInfo>
                        <MemberStatValue>{member.ongoingProjects}</MemberStatValue>
                        <MemberStatLabel>Ongoing</MemberStatLabel>
                      </MemberStatInfo>
                    </StatItem>
                    <StatItem>
                      <MemberStatIcon color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
                        <Star />
                      </MemberStatIcon>
                      <MemberStatInfo>
                        <MemberStatValue>{member.performance}%</MemberStatValue>
                        <MemberStatLabel>Performance</MemberStatLabel>
                      </MemberStatInfo>
                    </StatItem>
                    <StatItem>
                      <StatusBadge $color={statusColors.color} $textColor={statusColors.textColor}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </StatusBadge>
                    </StatItem>
                  </MemberStats>

                  <MemberContact>
                    <ContactItem>
                      <Mail />
                      {member.email}
                    </ContactItem>
                    <ContactItem>
                      <Phone />
                      {member.phone}
                    </ContactItem>
                    <ContactItem>
                      <MapPin />
                      {member.location}
                    </ContactItem>
                    <ContactItem>
                      <Calendar />
                      Joined {member.joinDate}
                    </ContactItem>
                  </MemberContact>
                </TeamMemberCard>
              );
            })}
          </TeamGrid>
        </DashboardContent>
      </MainContent>

      {/* Mobile sidebar overlay */}
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
    </DashboardContainer>
  );
};

export default TeamManagement;
