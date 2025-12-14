import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Screen = 'home' | 'instructions' | 'signals' | 'referral';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentSignal, setCurrentSignal] = useState<number | null>(null);
  const [balance, setBalance] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [userId] = useState(() => Math.random().toString(36).substring(2, 15));
  const referralLink = `${window.location.origin}/?ref=${userId}`;

  const generateSignal = () => {
    const signal = (Math.random() * (90 - 1.01) + 1.01).toFixed(2);
    setCurrentSignal(parseFloat(signal));
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована в буфер обмена!');
  };

  const handleRegister = () => {
    window.open('https://t.me/X_Quill_Bot/app?startapp=eHd1PTE3MDQwMjgzNzcmbT1uZXRsbzU1NSZjPWRlZmF1bHQ', '_blank');
  };

  if (screen === 'home') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF10F0] rounded-full blur-[100px] opacity-20 animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#00F0FF] rounded-full blur-[100px] opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl w-full space-y-12 animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-black text-center tracking-wider neon-glow-pink" style={{ color: '#FF10F0' }}>
            LUSKY BEAR
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button
              onClick={() => setScreen('instructions')}
              size="lg"
              className="h-24 text-2xl font-bold bg-gradient-to-r from-[#FF10F0] to-[#9b87f5] hover:scale-105 transition-transform neon-border-pink border-2 border-[#FF10F0]"
            >
              <Icon name="Rocket" size={32} className="mr-3" />
              Начать
            </Button>

            <Button
              onClick={() => setScreen('referral')}
              size="lg"
              className="h-24 text-2xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#9b87f5] hover:scale-105 transition-transform neon-border-cyan border-2 border-[#00F0FF]"
            >
              <Icon name="Users" size={32} className="mr-3" />
              Реферальная система
            </Button>

            <Button
              onClick={() => setScreen('signals')}
              size="lg"
              className="h-24 text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#FF10F0] hover:scale-105 transition-transform neon-border-pink border-2 border-[#9b87f5]"
            >
              <Icon name="Crown" size={32} className="mr-3" />
              VIP Сигналы
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'instructions') {
    return (
      <div className="min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Button
            onClick={() => setScreen('home')}
            variant="ghost"
            className="mb-4 text-[#00F0FF] hover:text-[#FF10F0]"
          >
            <Icon name="ArrowLeft" size={24} className="mr-2" />
            Назад
          </Button>

          <Card className="bg-black/40 border-2 border-[#FF10F0] neon-border-pink p-8">
            <h2 className="text-4xl font-black mb-6 neon-glow-pink" style={{ color: '#FF10F0' }}>
              ⚡ Инструкция для правильной работы ⚡
            </h2>

            <div className="space-y-6 text-lg">
              <div className="flex gap-4">
                <span className="text-3xl">🚀</span>
                <p><strong>1.</strong> Регистрируем совершенно новый аккаунт.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-3xl">🔥</span>
                <p><strong>2.</strong> Вам дают бесплатный бонус виде 50 рублей, и вводим по желанию сверху промокод.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-3xl">👑</span>
                <p><strong>3.</strong> Дальше пополняем баланс на любую сумму при желании, можно играть и на бонус но в этом случае казино будет вас сливать.</p>
              </div>

              <div className="flex gap-4">
                <span className="text-3xl">🌟</span>
                <p><strong>4.</strong> Заходим в игру Tower Rush и ставим 2 раза ставку это нужно чтобы казино увидел что вы не бот</p>
              </div>

              <div className="flex gap-4">
                <span className="text-3xl">🎰</span>
                <p><strong>5.</strong> Дальше заходим в игру CRASH X и нажимаем получить сигнал🎟️</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleRegister}
              size="lg"
              className="flex-1 h-16 text-xl font-bold bg-gradient-to-r from-[#FF10F0] to-[#9b87f5] hover:scale-105 transition-transform neon-border-pink border-2 border-[#FF10F0]"
            >
              <Icon name="UserPlus" size={28} className="mr-2" />
              Регистрироваться
            </Button>

            <Button
              onClick={() => setScreen('signals')}
              size="lg"
              className="flex-1 h-16 text-xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#9b87f5] hover:scale-105 transition-transform neon-border-cyan border-2 border-[#00F0FF]"
            >
              <Icon name="Play" size={28} className="mr-2" />
              Начать
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'signals') {
    return (
      <div className="min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Button
            onClick={() => setScreen('home')}
            variant="ghost"
            className="mb-4 text-[#00F0FF] hover:text-[#FF10F0]"
          >
            <Icon name="ArrowLeft" size={24} className="mr-2" />
            Назад
          </Button>

          <Card className="bg-black/40 border-2 border-[#00F0FF] neon-border-cyan p-8 text-center">
            <h2 className="text-5xl font-black mb-8 neon-glow-cyan" style={{ color: '#00F0FF' }}>
              🎰 CRASH X
            </h2>

            {currentSignal !== null && (
              <div className="mb-8 p-12 bg-black/60 rounded-lg border-4 border-[#FF10F0] neon-border-pink">
                <p className="text-2xl mb-4 text-[#00F0FF]">Следующий сигнал:</p>
                <p className="text-8xl font-black neon-glow-pink animate-pulse-glow" style={{ color: '#FF10F0' }}>
                  {currentSignal}x
                </p>
              </div>
            )}

            <Button
              onClick={generateSignal}
              size="lg"
              className="h-20 px-12 text-2xl font-bold bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] hover:scale-105 transition-transform neon-border-pink border-2 border-[#FF10F0]"
            >
              <Icon name="Zap" size={32} className="mr-3" />
              {currentSignal === null ? 'Получить сигнал' : 'Получить следующий сигнал'}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'referral') {
    return (
      <div className="min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#0f1419] to-[#1a0f2e]" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Button
            onClick={() => setScreen('home')}
            variant="ghost"
            className="mb-4 text-[#00F0FF] hover:text-[#FF10F0]"
          >
            <Icon name="ArrowLeft" size={24} className="mr-2" />
            Назад
          </Button>

          <div className="bg-gradient-to-r from-[#FF10F0] to-[#00F0FF] p-1 rounded-lg">
            <Card className="bg-black/90 p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-sm text-[#00F0FF] mb-1">Ваш баланс</p>
                  <p className="text-4xl font-black neon-glow-pink" style={{ color: '#FF10F0' }}>
                    {balance} ₽
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#00F0FF] mb-1">Рефералов</p>
                  <p className="text-4xl font-black neon-glow-cyan" style={{ color: '#00F0FF' }}>
                    {referralCount}
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-black mb-6 neon-glow-pink text-center" style={{ color: '#FF10F0' }}>
                ⭐ Реферальная программа Lusky Bear
              </h2>

              <div className="space-y-6 text-lg mb-8">
                <p className="text-center text-xl">
                  Зарабатывайте по <span className="text-[#FF10F0] font-bold">50 рублей</span> за приглашенного человека и его траты в казино Lucky bear
                </p>

                <div className="bg-black/60 p-6 rounded-lg border-2 border-[#9b87f5]">
                  <h3 className="text-2xl font-bold mb-4 text-[#00F0FF]">💰 Сколько вы получаете</h3>
                  <p>🥳 Вы получаете по <strong className="text-[#FF10F0]">50 ₽</strong> за каждого приглашённого, который пополнил баланс на минимальную сумму и получил хотя бы 2 сигнала.</p>
                  <p className="mt-4">Ваш приглашённый получает <strong className="text-[#00F0FF]">360% бонусом</strong> за первое пополнение баланса, и также бесплатные сигналы в казино Lusky Bear.</p>
                </div>

                <div className="bg-black/60 p-6 rounded-lg border-2 border-[#9b87f5]">
                  <h3 className="text-2xl font-bold mb-4 text-[#00F0FF]">🔍 Как это работает</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Вы отправляете человеку свою реферальную ссылку.</li>
                    <li>Он переходит по ней и выполняет условия и пополняет баланс и получает точные сигналы.</li>
                    <li>Ваш баланс пополняется на 50 рублей.</li>
                    <li>Всё понятно и просто 🎉</li>
                  </ol>
                </div>

                <div className="bg-black/60 p-6 rounded-lg border-2 border-[#9b87f5]">
                  <h3 className="text-2xl font-bold mb-4 text-[#00F0FF]">📌 Основные условия</h3>
                  <div className="space-y-3">
                    <p><strong>1️⃣</strong> Выплаты по реферальной программе осуществляются раз в неделю, за этот срок все ваши приглашенные пользователи закрепляют за вами.</p>
                    <p><strong>2️⃣</strong> Только новые пользователи, если вами приглашенный пользователь уже играл в казино Lusky Bear то он не будет отображаться.</p>
                    <p><strong>3️⃣</strong> Не нарушайте условия реферальной программы, не накручивайте трафик только живые пользователи и новые аккаунты, за нарушение соглашения о реферальной программы следует аннулирование баланса и блокировка пользователя.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/60 p-4 rounded-lg border-2 border-[#FF10F0] flex items-center gap-4">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 bg-transparent border-none outline-none text-[#00F0FF] font-mono text-sm"
                  />
                  <Button
                    onClick={copyReferralLink}
                    className="bg-gradient-to-r from-[#FF10F0] to-[#9b87f5] hover:scale-105 transition-transform"
                  >
                    <Icon name="Copy" size={20} className="mr-2" />
                    Копировать
                  </Button>
                </div>

                <p className="text-sm text-center text-[#00F0FF]">
                  Чтобы вывести баланс, напишите администратору и предоставьте скриншоты
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
