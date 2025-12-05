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
  FileText as FileIcon,
  Send,
  MoreVertical,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Printer
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

const TableHeader = styled.thead`
  th {
    text-align: left;
    padding: 12px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(59, 130, 246, 0.05);
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const TableCell = styled.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #1e293b;
`;

const InvoiceNumber = styled.div`
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClientName = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.$color};
  color: ${props => props.$textColor};
`;

const Amount = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 16px;
`;

const DueDate = styled.div`
  color: #64748b;
  font-size: 14px;
`;

const ActionButtonsCell = styled.div`
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

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease;
  
  @media (max-width: 640px) {
    width: 95%;
    margin: 20px;
  }
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
`;

const ModalCloseButton = styled.button`
  padding: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: #64748b;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelButton = styled(Button)`
  background: rgba(107, 114, 128, 0.1);
  color: #64748b;
  
  &:hover {
    background: rgba(107, 114, 128, 0.2);
  }
`;

const Invoices = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    dueDate: '',
    status: 'draft',
    issueDate: new Date().toISOString().split('T')[0]
  });
  const [invoices] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      client: 'Tech Corp',
      amount: 45000,
      status: 'paid',
      dueDate: '2024-07-15',
      issueDate: '2024-06-15'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      client: 'Design Studio',
      amount: 67000,
      status: 'pending',
      dueDate: '2024-07-20',
      issueDate: '2024-06-20'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      client: 'Marketing Pro',
      amount: 23000,
      status: 'overdue',
      dueDate: '2024-06-01',
      issueDate: '2024-05-01'
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      client: 'Creative Agency',
      amount: 35000,
      status: 'paid',
      dueDate: '2024-07-25',
      issueDate: '2024-06-25'
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      client: 'Startup Inc',
      amount: 89000,
      status: 'pending',
      dueDate: '2024-07-30',
      issueDate: '2024-06-30'
    },
    {
      id: 6,
      invoiceNumber: 'INV-2024-006',
      client: 'Tech Corp',
      amount: 18000,
      status: 'draft',
      dueDate: '2024-08-05',
      issueDate: '2024-07-05'
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New invoice:', formData);
    // Here you would typically save the invoice to your backend
    setShowAddModal(false);
    setFormData({
      client: '',
      amount: '',
      dueDate: '',
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0]
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return { color: 'rgba(16, 185, 129, 0.1)', textColor: '#10b981' };
      case 'pending':
        return { color: 'rgba(245, 158, 11, 0.1)', textColor: '#f59e0b' };
      case 'overdue':
        return { color: 'rgba(239, 68, 68, 0.1)', textColor: '#ef4444' };
      case 'draft':
        return { color: 'rgba(107, 114, 128, 0.1)', textColor: '#6b7280' };
      default:
        return { color: 'rgba(107, 114, 128, 0.1)', textColor: '#6b7280' };
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter(i => i.status === 'paid').length,
    pendingInvoices: invoices.filter(i => i.status === 'pending').length,
    totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
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
                  placeholder="Search invoices..." 
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
            <Title>Invoices</Title>
            <Subtitle>Manage your invoices and track payments</Subtitle>
          </PageTitle>

          {/* Stats Cards */}
          <StatsGrid>
            <StatCard $delay={0}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)">
                  <FileText />
                </StatIcon>
                <StatChange $positive>+12%</StatChange>
              </StatHeader>
              <StatValue>{stats.totalInvoices}</StatValue>
              <StatLabel>Total Invoices</StatLabel>
            </StatCard>

            <StatCard $delay={1}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #10b981 0%, #059669 100%)">
                  <CheckCircle />
                </StatIcon>
                <StatChange $positive>+8%</StatChange>
              </StatHeader>
              <StatValue>{stats.paidInvoices}</StatValue>
              <StatLabel>Paid Invoices</StatLabel>
            </StatCard>

            <StatCard $delay={2}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
                  <Clock />
                </StatIcon>
                <StatChange $positive>-2</StatChange>
              </StatHeader>
              <StatValue>{stats.pendingInvoices}</StatValue>
              <StatLabel>Pending Payment</StatLabel>
            </StatCard>

            <StatCard $delay={3}>
              <StatHeader>
                <StatIcon color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
                  <DollarSign />
                </StatIcon>
                <StatChange $positive>+23%</StatChange>
              </StatHeader>
              <StatValue>${stats.totalRevenue.toLocaleString()}</StatValue>
              <StatLabel>Total Revenue</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* Actions Bar */}
          <ActionsBar>
            <ActionButtons>
              <PrimaryButton onClick={() => setShowAddModal(true)}>
                <Plus />
                New Invoice
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
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </FilterSelect>
            </FilterContainer>
          </ActionsBar>

          {/* Invoices Table */}
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <th>Invoice #</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const statusColors = getStatusColor(invoice.status);
                  return (
                    <tr key={invoice.id}>
                      <TableCell>
                        <InvoiceNumber>
                          <FileIcon />
                          {invoice.invoiceNumber}
                        </InvoiceNumber>
                      </TableCell>
                      <TableCell>
                        <ClientName>{invoice.client}</ClientName>
                      </TableCell>
                      <TableCell>
                        <Amount>${invoice.amount.toLocaleString()}</Amount>
                      </TableCell>
                      <TableCell>
                        <StatusBadge $color={statusColors.color} $textColor={statusColors.textColor}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <DueDate>{invoice.dueDate}</DueDate>
                      </TableCell>
                      <TableCell>
                        <ActionButtonsCell>
                          <ViewButton>
                            <Eye />
                          </ViewButton>
                          <EditButton>
                            <Edit />
                          </EditButton>
                          <DeleteButton>
                            <Trash2 />
                          </DeleteButton>
                        </ActionButtonsCell>
                      </TableCell>
                    </tr>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardContent>
      </MainContent>

      {/* Mobile sidebar overlay */}
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      
      {/* Add Invoice Modal */}
      <ModalOverlay $show={showAddModal}>
        <ModalContainer>
          <ModalHeader>
            <div>
              <ModalTitle>Create New Invoice</ModalTitle>
              <ModalSubtitle>Fill in the details to create a new invoice</ModalSubtitle>
            </div>
            <ModalCloseButton onClick={() => setShowAddModal(false)}>
              <X />
            </ModalCloseButton>
          </ModalHeader>
          
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <FormLabel>Client Name</FormLabel>
                <FormInput
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Amount ($)</FormLabel>
                <FormInput
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Issue Date</FormLabel>
                <FormInput
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Due Date</FormLabel>
                <FormInput
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Status</FormLabel>
                <FormSelect
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </FormSelect>
              </FormGroup>
            </ModalBody>
            
            <ModalFooter>
              <CancelButton type="button" onClick={() => setShowAddModal(false)}>
                Cancel
              </CancelButton>
              <PrimaryButton type="submit">
                <Plus />
                Create Invoice
              </PrimaryButton>
            </ModalFooter>
          </form>
        </ModalContainer>
      </ModalOverlay>
    </DashboardContainer>
  );
};

export default Invoices;