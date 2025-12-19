import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  username: string;
  balance: number;
  referralCount: number;
  referralCode: string;
}

interface HomeScreenProps {
  user: User;
  balance: number;
  referralCount: number;
  setScreen: (screen: any) => void;
  handleVipSignals: () => void;
  handleWithdraw: () => void;
  handleLogout: () => void;
}

export const HomeScreen = ({
  user,
  balance,
  referralCount,
  setScreen,
  handleVipSignals,
  handleWithdraw,
  handleLogout
}: HomeScreenProps) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-black" style={{ color: '#9b87f5' }}>
            🐻 Lusky Bear
          </h1>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300"
          >
            <Icon name="LogOut" size={20} className="mr-2" />
            Выход
          </Button>
        </div>

        <Card className="bg-black/60 border border-[#9b87f5]/30 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <Icon name="User" size={32} className="text-[#00F0FF]" />
            <div>
              <p className="text-base sm:text-lg font-semibold" style={{ color: '#00F0FF' }}>
                {user.username}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">ID: {user.id}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-black/40 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Баланс</p>
              <p className="text-lg sm:text-2xl font-bold" style={{ color: '#00F0FF' }}>
                {balance} ₽
              </p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Рефералов</p>
              <p className="text-lg sm:text-2xl font-bold" style={{ color: '#FF10F0' }}>
                {referralCount}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Button
            onClick={() => setScreen('instructions')}
            size="lg"
            className="h-16 sm:h-20 text-base sm:text-xl font-bold bg-[#1a1a2e] hover:bg-[#252545] text-[#9b87f5] border-2 border-[#9b87f5]/30 hover:border-[#9b87f5]/60 transition-all"
          >
            <Icon name="BookOpen" size={24} className="mr-2" />
            Начать
          </Button>

          <Button
            onClick={() => setScreen('signals')}
            size="lg"
            className="h-16 sm:h-20 text-base sm:text-xl font-bold bg-[#1a1a2e] hover:bg-[#252545] text-[#00F0FF] border-2 border-[#00F0FF]/30 hover:border-[#00F0FF]/60 transition-all"
          >
            <Icon name="TrendingUp" size={24} className="mr-2" />
            Сигналы
          </Button>

          <Button
            onClick={() => setScreen('referral')}
            size="lg"
            className="h-16 sm:h-20 text-base sm:text-xl font-bold bg-[#1a1a2e] hover:bg-[#252545] text-[#FF10F0] border-2 border-[#FF10F0]/30 hover:border-[#FF10F0]/60 transition-all"
          >
            <Icon name="Users" size={24} className="mr-2" />
            Рефералы
          </Button>

          <Button
            onClick={handleVipSignals}
            size="lg"
            className="h-16 sm:h-20 text-base sm:text-xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7c3aed] hover:from-[#8b77e5] hover:to-[#6c2acd] text-white border-2 border-[#9b87f5]/50 transition-all"
          >
            <Icon name="Crown" size={24} className="mr-2" />
            VIP Сигналы
          </Button>
        </div>

        <Button
          onClick={handleWithdraw}
          size="lg"
          className="w-full h-14 sm:h-16 text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white transition-all"
        >
          <Icon name="DollarSign" size={24} className="mr-2" />
          Вывести средства
        </Button>
      </div>
    </div>
  );
};
