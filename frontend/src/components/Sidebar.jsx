import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3,
  Home,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Settings,
  X,
  Menu,
  CheckCircle,
  UserPlus
} from 'lucide-react';

// Styled Components
const SidebarContainer = styled.aside`
  position: fixed;
  inset-y: 0;
  left: 0;
  z-index: 50;
  width: 200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: ${props => props.$open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (min-width: 1024px) {
    transform: translateX(0);
    position: static;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
  
  svg {
    width: 18px;
    height: 18px;
    color: white;
  }
`;

const LogoText = styled.span`
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavContainer = styled.nav`
  margin-top: 20px;
  padding: 0 16px;
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 6px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#64748b'};
  box-shadow: ${props => props.$active ? '0 4px 16px rgba(59, 130, 246, 0.3)' : 'none'};
  
  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)' : 'rgba(59, 130, 246, 0.1)'};
    color: ${props => props.$active ? 'white' : '#3b82f6'};
    transform: translateX(2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
`;

const CloseButton = styled.button`
  display: none;
  padding: 6px;
  border: none;
  background: none;
  cursor: pointer;
  color: #64748b;
  transition: all 0.3s ease;
  
  @media (max-width: 1023px) {
    display: block;
  }
  
  &:hover {
    color: #1e293b;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Clients', path: '/admin/clients' },
    { icon: UserPlus, label: 'Team Management', path: '/admin/team' },
    { icon: FileText, label: 'Projects', path: '/admin/projects' },
    { icon: CheckCircle, label: 'Tasks', path: '/admin/tasks' },
    { icon: DollarSign, label: 'Invoices', path: '/admin/invoices' },
    { icon: Calendar, label: 'Calendar', path: '/admin/calendar' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  return (
    <SidebarContainer $open={open}>
      <SidebarHeader>
        <LogoContainer>
          <LogoIcon>
            <BarChart3 />
          </LogoIcon>
          <LogoText>Dashboard</LogoText>
        </LogoContainer>
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>
      </SidebarHeader>
      
      <NavContainer>
        {sidebarItems.map((item, index) => (
          <NavItem
            key={index}
            $active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <item.icon />
            {item.label}
          </NavItem>
        ))}
      </NavContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
