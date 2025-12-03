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

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.1);
`;

const TableCell = styled.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #1e293b;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const ClientName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ClientAvatar = styled.div`
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

const ClientInfo = styled.div`
  div {
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 2px;
  }
  
  span {
    font-size: 12px;
    color: #64748b;
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

const ActionCell = styled.div`
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

const Clients = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'active',
    address: ''
  });
  const [clients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      company: 'Tech Corp',
      status: 'active',
      projects: 5,
      revenue: 45000,
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      company: 'Design Studio',
      status: 'active',
      projects: 3,
      revenue: 32000,
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      company: 'Marketing Pro',
      status: 'inactive',
      projects: 2,
      revenue: 18000,
      joinDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      company: 'Creative Agency',
      status: 'active',
      projects: 8,
      revenue: 67000,
      joinDate: '2023-04-05'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.b@example.com',
      company: 'Startup Inc',
      status: 'pending',
      projects: 1,
      revenue: 8000,
      joinDate: '2023-05-12'
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
    console.log('New client data:', formData);
    // Here you would typically send the data to your backend
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      status: 'active',
      address: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { color: 'rgba(16, 185, 129, 0.1)', textColor: '#10b981' };
      case 'inactive':
        return { color: 'rgba(107, 114, 128, 0.1)', textColor: '#6b7280' };
      case 'pending':
        return { color: 'rgba(245, 158, 11, 0.1)', textColor: '#f59e0b' };
      default:
        return { color: 'rgba(107, 114, 128, 0.1)', textColor: '#6b7280' };
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.revenue, 0),
    newClients: clients.filter(c => new Date(c.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length
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
                  placeholder="Search clients..." 
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
            <Title>Clients</Title>
            <Subtitle>Manage your client relationships and track their projects</Subtitle>
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
              <StatValue>{stats.totalClients}</StatValue>
              <StatLabel>Total Clients</StatLabel>
            </StatCard>

            <StatCard $delay={1}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                  <BarChart3 />
                </StatIcon>
                <StatChange $positive>+8%</StatChange>
              </StatHeader>
              <StatValue>{stats.activeClients}</StatValue>
              <StatLabel>Active Clients</StatLabel>
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
              <StatValue>{stats.newClients}</StatValue>
              <StatLabel>New Clients (30 days)</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* Actions Bar */}
          <ActionsBar>
            <ActionButtons>
              <PrimaryButton onClick={() => setShowAddModal(true)}>
                <Plus />
                Add Client
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </FilterSelect>
            </FilterContainer>
          </ActionsBar>

          {/* Clients Table */}
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Client</TableHeader>
                  <TableHeader>Company</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Projects</TableHeader>
                  <TableHeader>Revenue</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => {
                  const statusColors = getStatusColor(client.status);
                  return (
                    <tr key={client.id}>
                      <TableCell>
                        <ClientName>
                          <ClientAvatar>
                            <Users />
                          </ClientAvatar>
                          <ClientInfo>
                            <div>{client.name}</div>
                            <span>{client.email}</span>
                          </ClientInfo>
                        </ClientName>
                      </TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell>
                        <StatusBadge $color={statusColors.color} $textColor={statusColors.textColor}>
                          {client.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{client.projects}</TableCell>
                      <TableCell>${client.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <ActionCell>
                          <ViewButton>
                            <Eye />
                          </ViewButton>
                          <EditButton>
                            <Edit />
                          </EditButton>
                          <DeleteButton>
                            <Trash2 />
                          </DeleteButton>
                        </ActionCell>
                      </TableCell>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableContainer>
        </DashboardContent>
      </MainContent>

      {/* Mobile sidebar overlay */}
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      {/* Add Client Modal */}
      <ModalOverlay $show={showAddModal}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Add New Client</ModalTitle>
            <CloseModalButton onClick={() => setShowAddModal(false)}>
              <X />
            </CloseModalButton>
          </ModalHeader>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Client Name *</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter client name"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email Address *</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Company</FormLabel>
              <FormInput
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Phone Number</FormLabel>
              <FormInput
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Status</FormLabel>
              <FormSelect
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormInput
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </FormGroup>

            <FormButtons>
              <CancelButton type="button" onClick={() => setShowAddModal(false)}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit">
                Add Client
              </SubmitButton>
            </FormButtons>
          </form>
        </ModalContainer>
      </ModalOverlay>
    </DashboardContainer>
  );
};

export default Clients;
