import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type Screen = 'admin' | 'admin_user';

interface AdminPanelProps {
  screen: Screen;
  setScreen: (screen: any) => void;
  adminUsers: any[];
  selectedUser: any | null;
  setSelectedUser: (user: any | null) => void;
  editBalance: string;
  setEditBalance: (value: string) => void;
  editReferrals: string;
  setEditReferrals: (value: string) => void;
  banReason: string;
  setBanReason: (value: string) => void;
  loadAdminUsers: () => Promise<void>;
  handleBanUser: () => Promise<void>;
  handleUnbanUser: (userId: number) => Promise<void>;
  handleUpdateUser: () => Promise<void>;
  handleDeleteUser: () => Promise<void>;
  handleLogout: () => void;
}

export const AdminPanel = ({
  screen,
  setScreen,
  adminUsers,
  selectedUser,
  setSelectedUser,
  editBalance,
  setEditBalance,
  editReferrals,
  setEditReferrals,
  banReason,
  setBanReason,
  handleBanUser,
  handleUnbanUser,
  handleUpdateUser,
  handleLogout,
}: AdminPanelProps) => {
  if (screen === 'admin') {
    return (
      <div className="min-h-screen p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
        
        <div className="relative z-10 max-w-6xl mx-auto space-y-6 animate-fade-in py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl sm:text-5xl font-black" style={{ color: '#FF10F0', textShadow: '0 0 20px rgba(255, 16, 240, 0.5)' }}>
              АДМИН-ПАНЕЛЬ
            </h1>
            <Button
              onClick={() => {
                handleLogout();
              }}
              variant="ghost"
              className="text-[#00F0FF] hover:text-[#FF10F0] text-sm"
            >
              <Icon name="LogOut" size={20} className="mr-1" />
              Выход
            </Button>
          </div>

          <Card className="bg-black/60 border border-[#FF10F0]/30 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center" style={{ color: '#00F0FF' }}>
              Список пользователей ({adminUsers.length})
            </h2>

            <div className="space-y-2">
              {adminUsers.map((u) => (
                <div
                  key={u.id}
                  className="bg-[#1a1a2e] p-3 rounded-lg border border-[#FF10F0]/20 hover:border-[#FF10F0]/50 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedUser(u);
                    setEditBalance(u.balance.toString());
                    setEditReferrals(u.referralCount.toString());
                    setScreen('admin_user');
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#FF10F0]">{u.username}</p>
                        <p className="text-xs text-gray-400">ID: {u.id}</p>
                      </div>
                      {u.isBanned && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                          Заблокирован
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4 text-xs">
                      <div>
                        <span className="text-gray-400">Баланс:</span>{' '}
                        <span className="text-[#00F0FF] font-bold">{u.balance} ₽</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Рефералов:</span>{' '}
                        <span className="text-[#00F0FF] font-bold">{u.referralCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'admin_user' && selectedUser) {
    return (
      <div className="min-h-screen p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in py-4">
          <Button
            onClick={() => {
              setScreen('admin');
              setSelectedUser(null);
            }}
            variant="ghost"
            className="text-[#00F0FF] hover:text-[#FF10F0]"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <Card className="bg-black/60 border border-[#FF10F0]/30 p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#FF10F0' }}>
              Управление пользователем
            </h2>

            <div className="space-y-6">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#FF10F0]/20">
                <p className="text-sm text-gray-400 mb-1">Имя пользователя</p>
                <p className="text-xl font-bold text-[#FF10F0]">{selectedUser.username}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {selectedUser.id}</p>
                {selectedUser.isBanned && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded">
                    <p className="text-sm text-red-400 font-bold">Пользователь заблокирован</p>
                    <p className="text-xs text-red-300 mt-1">Причина: {selectedUser.banReason}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#00F0FF] mb-2 block">Баланс (₽)</label>
                  <Input
                    type="number"
                    value={editBalance}
                    onChange={(e) => setEditBalance(e.target.value)}
                    className="bg-[#1a1a2e] border-[#FF10F0]/30 text-white"
                    placeholder="Введите новый баланс"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#00F0FF] mb-2 block">Количество рефералов</label>
                  <Input
                    type="number"
                    value={editReferrals}
                    onChange={(e) => setEditReferrals(e.target.value)}
                    className="bg-[#1a1a2e] border-[#FF10F0]/30 text-white"
                    placeholder="Введите количество рефералов"
                  />
                </div>

                <Button
                  onClick={handleUpdateUser}
                  className="w-full bg-[#1a1a2e] hover:bg-[#252545] text-[#00F0FF] border-2 border-[#00F0FF]/30 hover:border-[#00F0FF]/60"
                >
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить изменения
                </Button>
              </div>

              {!selectedUser.isBanned ? (
                <div className="space-y-3 pt-4 border-t border-[#FF10F0]/20">
                  <label className="text-sm text-red-400 mb-2 block font-bold">Блокировка пользователя</label>
                  <Input
                    type="text"
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    className="bg-[#1a1a2e] border-red-500/30 text-white"
                    placeholder="Укажите причину блокировки"
                  />
                  <Button
                    onClick={handleBanUser}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border-2 border-red-500/50 hover:border-red-500"
                  >
                    <Icon name="Ban" size={18} className="mr-2" />
                    Заблокировать пользователя
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleUnbanUser(selectedUser.id)}
                  className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-2 border-green-500/50 hover:border-green-500"
                >
                  <Icon name="CheckCircle" size={18} className="mr-2" />
                  Разблокировать пользователя
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};
