import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AuthScreen } from '@/components/screens/AuthScreen';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { UserScreens } from '@/components/screens/UserScreens';
import { AdminPanel } from '@/components/screens/AdminPanel';

type Screen = 'home' | 'instructions' | 'signals' | 'referral' | 'auth' | 'admin' | 'admin_user' | 'vip' | 'crashx';

interface User {
  id: number;
  username: string;
  balance: number;
  referralCount: number;
  referralCode: string;
}

const AUTH_URL = 'https://functions.poehali.dev/84480352-2061-48c5-b055-98dde5c9eaac';
const ADMIN_URL = 'https://functions.poehali.dev/c85f181c-7e3a-4ae4-b2ab-510eafdab9d4';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('auth');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [currentSignal, setCurrentSignal] = useState<number | null>(null);
  const [balance, setBalance] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [editBalance, setEditBalance] = useState('');
  const [editReferrals, setEditReferrals] = useState('');
  const [banReason, setBanReason] = useState('');
  const [crashXSignal, setCrashXSignal] = useState<number | null>(null);
  const [crashXTimeLeft, setCrashXTimeLeft] = useState(0);
  const [isCrashXWaiting, setIsCrashXWaiting] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('isAdmin');
    
    if (savedAdmin === 'true') {
      setIsAdmin(true);
      loadAdminUsers();
      setScreen('admin');
    } else if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setBalance(userData.balance || 0);
        setReferralCount(userData.referralCount || 0);
        setScreen('home');
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        setScreen('auth');
      }
    }
  }, []);

  useEffect(() => {
    if (user && !isAdmin) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(ADMIN_URL);
          const data = await response.json();
          if (data.users) {
            const currentUser = data.users.find((u: any) => u.id === user.id);
            if (currentUser) {
              const balanceChanged = currentUser.balance !== balance;
              const referralsChanged = currentUser.referralCount !== referralCount;
              
              if (balanceChanged || referralsChanged) {
                setBalance(currentUser.balance);
                setReferralCount(currentUser.referralCount);
                const updatedUser = {
                  ...user,
                  balance: currentUser.balance,
                  referralCount: currentUser.referralCount
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                if (balanceChanged) {
                  toast.info(`💰 Ваш баланс обновлён: ${currentUser.balance} ₽`);
                }
                if (referralsChanged) {
                  toast.info(`👥 Рефералов: ${currentUser.referralCount}`);
                }
              }
            }
          }
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [user?.id, isAdmin, balance, referralCount]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isWaiting) {
      setIsWaiting(false);
    }
  }, [timeLeft, isWaiting]);

  useEffect(() => {
    if (crashXTimeLeft > 0) {
      const timer = setTimeout(() => setCrashXTimeLeft(crashXTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (crashXTimeLeft === 0 && isCrashXWaiting) {
      setIsCrashXWaiting(false);
    }
  }, [crashXTimeLeft, isCrashXWaiting]);

  const generateSignal = () => {
    if (isWaiting) {
      toast.error(`Подождите ${timeLeft} секунд до следующего сигнала`);
      return;
    }

    const rand = Math.random() * 100;
    let signal;
    
    if (rand < 1) {
      signal = (Math.random() * (90 - 20) + 20).toFixed(2);
    } else if (rand < 30) {
      signal = (Math.random() * (20 - 10) + 10).toFixed(2);
    } else {
      signal = (Math.random() * (10 - 1.01) + 1.01).toFixed(2);
    }
    
    setCurrentSignal(parseFloat(signal.replace(',', '.')));
    setIsWaiting(true);
    setTimeLeft(60);
  };

  const handleVipSignals = () => {
    setScreen('vip');
  };

  const handleWithdraw = () => {
    window.open('https://t.me/Lusky_bear_bot', '_blank');
  };

  const copyReferralLink = () => {
    if (user?.referralCode) {
      const referralLink = `https://t.me/Lusky_bear_bot?start=${user.referralCode}`;
      navigator.clipboard.writeText(referralLink);
      toast.success('Ссылка скопирована в буфер обмена!');
    }
  };

  const generateCrashXSignal = () => {
    if (isCrashXWaiting) {
      toast.error(`Подождите ${crashXTimeLeft} секунд до следующего сигнала`);
      return;
    }

    const rand = Math.random() * 100;
    let signal;
    
    if (rand < 5) {
      signal = (Math.random() * (100 - 15) + 15).toFixed(2);
    } else if (rand < 25) {
      signal = (Math.random() * (15 - 10) + 10).toFixed(2);
    } else {
      signal = (Math.random() * (10 - 1.00) + 1.00).toFixed(2);
    }
    
    setCrashXSignal(parseFloat(signal));
    setIsCrashXWaiting(true);
    setCrashXTimeLeft(60);
  };

  const handleRegister = () => {
    window.open('https://t.me/C_Treasure_Bot/app?startapp=eHd1PTE3MDQwMjgzNzcmbT1uZXRsbzU1NSZjPWRlZmF1bHQ', '_blank');
  };

  const handleAuth = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error('Введите имя пользователя и пароль');
      return;
    }

    try {
      if (username.trim() === 'admin345') {
        const response = await fetch(ADMIN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'login',
            username: username.trim(),
            password: password.trim()
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
          toast.success('Добро пожаловать, администратор!');
          await loadAdminUsers();
          setScreen('admin');
          setUsername('');
          setPassword('');
          return;
        }
      }

      if (authMode === 'register') {
        const registeredAccounts = JSON.parse(localStorage.getItem('registeredAccounts') || '[]');
        if (registeredAccounts.length >= 2) {
          toast.error('Превышен лимит регистраций с этого устройства (максимум 2 аккаунта)');
          return;
        }
      }

      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get('ref');

      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: authMode,
          username: username.trim(),
          password: password.trim(),
          referralCode: authMode === 'register' ? referralCode : undefined
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userData = {
          id: data.user.id,
          username: data.user.username,
          balance: data.user.balance || 0,
          referralCount: data.user.referralCount || 0,
          referralCode: data.user.referralCode || ''
        };

        setUser(userData);
        setBalance(userData.balance);
        setReferralCount(userData.referralCount);
        localStorage.setItem('user', JSON.stringify(userData));

        if (authMode === 'register') {
          const registeredAccounts = JSON.parse(localStorage.getItem('registeredAccounts') || '[]');
          registeredAccounts.push({ username: username.trim(), registeredAt: new Date().toISOString() });
          localStorage.setItem('registeredAccounts', JSON.stringify(registeredAccounts));
        }

        toast.success(authMode === 'login' ? 'Добро пожаловать!' : 'Регистрация успешна!');
        setScreen('home');
        setUsername('');
        setPassword('');
      } else {
        toast.error(data.error || 'Ошибка аутентификации');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Ошибка соединения с сервером');
    }
  };

  const loadAdminUsers = async () => {
    try {
      const response = await fetch(ADMIN_URL);
      const data = await response.json();
      if (data.users) {
        setAdminUsers(data.users);
      }
    } catch (error) {
      console.error('Load users error:', error);
      toast.error('Ошибка загрузки пользователей');
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(ADMIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_user',
          userId: selectedUser.id,
          balance: editBalance ? parseInt(editBalance) : undefined,
          referralCount: editReferrals ? parseInt(editReferrals) : undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Данные пользователя обновлены');
        await loadAdminUsers();
        setScreen('admin');
        setSelectedUser(null);
        setEditBalance('');
        setEditReferrals('');
      } else {
        toast.error(data.error || 'Ошибка обновления');
      }
    } catch (error) {
      toast.error('Ошибка соединения с сервером');
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser || !banReason.trim()) {
      toast.error('Укажите причину блокировки');
      return;
    }

    try {
      const response = await fetch(ADMIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ban_user',
          userId: selectedUser.id,
          reason: banReason.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Пользователь заблокирован');
        await loadAdminUsers();
        setScreen('admin');
        setSelectedUser(null);
        setBanReason('');
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка соединения с сервером');
    }
  };

  const handleUnbanUser = async (userId: number) => {
    try {
      const response = await fetch(ADMIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'unban_user',
          userId
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Пользователь разблокирован');
        await loadAdminUsers();
        setScreen('admin');
        setSelectedUser(null);
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка соединения с сервером');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return;

    try {
      const response = await fetch(ADMIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_user',
          userId
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Пользователь удалён');
        await loadAdminUsers();
        if (selectedUser?.id === userId) {
          setScreen('admin');
          setSelectedUser(null);
        }
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка соединения с сервером');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBalance(0);
    setReferralCount(0);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setScreen('auth');
    toast.success('Вы вышли из системы');
  };

  if (screen === 'auth') {
    return (
      <AuthScreen
        authMode={authMode}
        setAuthMode={setAuthMode}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleAuth={handleAuth}
        handleRegister={handleRegister}
      />
    );
  }

  if (screen === 'home' && user) {
    return (
      <HomeScreen
        user={user}
        balance={balance}
        referralCount={referralCount}
        setScreen={setScreen}
        handleVipSignals={handleVipSignals}
        handleWithdraw={handleWithdraw}
        handleLogout={handleLogout}
      />
    );
  }

  if (['instructions', 'signals', 'referral', 'vip', 'crashx'].includes(screen) && user) {
    return (
      <UserScreens
        screen={screen}
        user={user}
        balance={balance}
        referralCount={referralCount}
        currentSignal={currentSignal}
        timeLeft={timeLeft}
        isWaiting={isWaiting}
        crashXSignal={crashXSignal}
        crashXTimeLeft={crashXTimeLeft}
        isCrashXWaiting={isCrashXWaiting}
        setScreen={setScreen}
        generateSignal={generateSignal}
        copyReferralLink={copyReferralLink}
        generateCrashXSignal={generateCrashXSignal}
      />
    );
  }

  if (['admin', 'admin_user'].includes(screen) && isAdmin) {
    return (
      <AdminPanel
        screen={screen}
        setScreen={setScreen}
        adminUsers={adminUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        editBalance={editBalance}
        setEditBalance={setEditBalance}
        editReferrals={editReferrals}
        setEditReferrals={setEditReferrals}
        banReason={banReason}
        setBanReason={setBanReason}
        loadAdminUsers={loadAdminUsers}
        handleBanUser={handleBanUser}
        handleUnbanUser={handleUnbanUser}
        handleUpdateUser={handleUpdateUser}
        handleDeleteUser={handleDeleteUser}
        handleLogout={handleLogout}
      />
    );
  }

  return null;
};

export default Index;
