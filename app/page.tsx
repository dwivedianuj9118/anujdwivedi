"use client";

import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface TechCategory {
  title: string;
  icon: string;
  bgClass: string;
  iconBgClass: string;
  iconTextClass: string;
  borderHoverClass: string;
  skills: string[];
}

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: string;
  statusType: 'success' | 'info' | 'warning';
  gradient: string;
  category: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

// ==========================================
// CONSTANT DATA STORES
// ==========================================
const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Robust Backend",
    icon: "⚡",
    bgClass: "border-indigo-500/10 dark:border-indigo-500/20",
    iconBgClass: "bg-indigo-500/10 dark:bg-indigo-500/20",
    iconTextClass: "text-indigo-600 dark:text-indigo-400",
    borderHoverClass: "hover:border-indigo-500/30 dark:hover:border-indigo-500/30",
    skills: ["Laravel (Livewire)", "Node.js (Express)", "TypeScript", "PHP 8.x", "RESTful APIs", "Java Essentials"]
  },
  {
    title: "Interactive UI",
    icon: "🖥️",
    bgClass: "border-purple-500/10 dark:border-purple-500/20",
    iconBgClass: "bg-purple-500/10 dark:bg-purple-500/20",
    iconTextClass: "text-purple-600 dark:text-purple-400",
    borderHoverClass: "hover:border-purple-500/30 dark:hover:border-purple-500/30",
    skills: ["ReactJS", "NextJS", "Tailwind CSS", "Sass", "Responsive Web", "WCAG Compliant"]
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    bgClass: "border-emerald-500/10 dark:border-emerald-500/20",
    iconBgClass: "bg-emerald-500/10 dark:bg-emerald-500/10",
    iconTextClass: "text-emerald-600 dark:text-emerald-400",
    borderHoverClass: "hover:border-emerald-500/30 dark:hover:border-emerald-500/30",
    skills: ["Docker Containers", "CI / CD Pipelines", "AWS (EC2, RDS)", "GCP Compute Engine", "Azure Deployments", "Ubuntu Server Config"]
  },
  {
    title: "Database & Caching",
    icon: "💾",
    bgClass: "border-amber-500/10 dark:border-amber-500/20",
    iconBgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    iconTextClass: "text-amber-600 dark:text-amber-400",
    borderHoverClass: "hover:border-amber-500/30 dark:hover:border-amber-500/30",
    skills: ["Redis Cache", "MySQL (Indexing)", "MongoDB", "PostgreSQL", "Cloudflare Edge", "Kafka Messaging"]
  },
  {
    title: "Fintech Integration",
    icon: "💳",
    bgClass: "border-rose-500/10 dark:border-rose-500/20",
    iconBgClass: "bg-rose-500/10 dark:bg-rose-500/20",
    iconTextClass: "text-rose-600 dark:text-rose-400",
    borderHoverClass: "hover:border-rose-500/30 dark:hover:border-rose-500/30",
    skills: ["Razorpay API", "PayPal Direct", "Cashfree Gateway", "PhonePe integration", "Worldline API", "CCAvenue Rail"]
  },
  {
    title: "Security & Quality",
    icon: "🛡️",
    bgClass: "border-cyan-500/10 dark:border-cyan-500/20",
    iconBgClass: "bg-cyan-500/10 dark:bg-cyan-500/20",
    iconTextClass: "text-cyan-600 dark:text-cyan-400",
    borderHoverClass: "hover:border-cyan-500/30 dark:hover:border-cyan-500/30",
    skills: ["JWT Authentication", "RBAC Authorization", "Jest Unit Testing", "Playwright E2E", "Github Actions", "Packagist Publishing"]
  }
];

const PROJECTS_DATA: Project[] = [
  {
    title: 'Talbros BP Portal',
    subtitle: 'Enterprise Microsoft ERP Connector',
    description: 'Developed an automated business orchestration layer linking localized warehouse systems with Microsoft Dynamics 365 Business Central endpoints. Built background queue architectures handling 10,000+ continuous item synchronizations with automatic retry buffers.',
    tags: ['Laravel', 'Microsoft API', 'Redis Queues', 'Docker'],
    status: 'In Production',
    statusType: 'success',
    gradient: 'from-indigo-600 via-purple-600 to-indigo-800',
    category: 'enterprise'
  },
  {
    title: 'Real-Time Dating Engine',
    subtitle: 'High-Concurrency Match Backend',
    description: 'Designed and deployed a highly available, real-time message router using Node.js and WebSockets. Achieved 99.99% message delivery speed with custom memory-cached queues, routing messages instantly without persistent database overhead.',
    tags: ['Node.js', 'WebSockets', 'MongoDB', 'Redis Cluster'],
    status: '99.9% Reliable',
    statusType: 'info',
    gradient: 'from-purple-600 via-pink-600 to-violet-800',
    category: 'high-traffic'
  },
  {
    title: 'Laravel Custom Artisan Framework',
    subtitle: 'Open-Source Packagist Package',
    description: 'Engineered and published a highly extensible open-source package containing customized boilerplate CLI utilities, configuration handlers, and provider abstractions to eliminate repetitive setup structures.',
    tags: ['Laravel API', 'Composer Package', 'Packagist', 'PHPUnit'],
    status: 'Packagist Verified',
    statusType: 'success',
    gradient: 'from-emerald-600 via-teal-600 to-green-800',
    category: 'open-source'
  }
];

const GATEWAY_PAYLOADS = {
  razorpay: {
    entity: "event",
    account_id: "acc_AnujDwivedi9118",
    event: "payment.authorized",
    payload: {
      payment: {
        entity: {
          id: "pay_RAZORPAY_9118840",
          amount: 249900,
          currency: "INR",
          status: "authorized",
          method: "upi",
          email: "recruiter@enterprise.com",
          contact: "+919118840397"
        }
      }
    }
  },
  paypal: {
    event_type: "PAYMENT.SALE.COMPLETED",
    resource_type: "sale",
    summary: "Subscription Payment Authorized for Senior Full Stack Engineer Integration",
    resource: {
      id: "PAYPAL_TXN_840397",
      amount: {
        total: "199.00",
        currency: "USD"
      },
      state: "completed"
    }
  },
  cashfree: {
    txStatus: "SUCCESS",
    referenceId: "CF_REFERENCE_9118840397",
    paymentMode: "NET_BANKING",
    txTime: "2026-06-24 16:19:00",
    orderAmount: 18500.00,
    signature: "f7e8b9a10d32c45e69f8b0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5"
  },
  stripe: {
    id: "evt_stripe_senior_devops",
    object: "event",
    type: "payment_intent.succeeded",
    data: {
      object: {
        id: "pi_stripe_3M840397",
        amount_received: 500000,
        currency: "usd",
        status: "succeeded",
        payment_method_types: ["card"]
      }
    }
  }
};

export default function App() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // DevOps terminal state
  const [terminalLogs, setTerminalLogs] = useState<LogEntry[]>([
    { timestamp: '16:19:01', message: 'System standby. Automated AWS Pipeline ready.', type: 'info' },
    { timestamp: '16:19:02', message: 'Ready to trigger continuous deployment pipeline. Click execute below.', type: 'warning' }
  ]);
  const [isDeploying, setIsDeploying] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Live Simulated Server Metrics
  const [serverMetrics, setServerMetrics] = useState({ cpu: 12, memory: 42, network: 1.2 });

  // Payment sandbox state
  const [selectedGateway, setSelectedGateway] = useState<'razorpay' | 'paypal' | 'cashfree' | 'stripe'>('razorpay');
  const [webhookPayload, setWebhookPayload] = useState<string>(JSON.stringify(GATEWAY_PAYLOADS.razorpay, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [webhookStatus, setWebhookStatus] = useState<'ready' | 'processing' | 'success' | 'error'>('ready');

  // Recruiter form state
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');
  const [projectScope, setProjectScope] = useState('Laravel Backend');
  const [customMessage, setCustomMessage] = useState('');
  const [targetSkills, setTargetSkills] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // ==========================================
  // SIDE EFFECTS & REALTIME DOM BINDING
  // ==========================================
  // Dynamically hook theme state directly onto Document Element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  useEffect(() => {
    // Inject Syne and DM Sans fonts dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Sync scroll on new terminal output
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Handle server metrics simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      setServerMetrics({
        cpu: Math.floor(Math.random() * (22 - 8) + 8),
        memory: parseFloat((Math.random() * (45.8 - 41.2) + 41.2).toFixed(1)),
        network: parseFloat((Math.random() * (4.8 - 0.8) + 0.8).toFixed(1))
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Update dynamic payload view when selecting gateway tab
  const handleGatewayChange = (gateway: 'razorpay' | 'paypal' | 'cashfree' | 'stripe') => {
    setSelectedGateway(gateway);
    setWebhookPayload(JSON.stringify(GATEWAY_PAYLOADS[gateway], null, 2));
    setJsonError(null);
    setWebhookStatus('ready');
  };

  // Validate real-time user JSON entries
  const handlePayloadEdit = (val: string) => {
    setWebhookPayload(val);
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  // ==========================================
  // THEME SWITCH LOGIC
  // ==========================================
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // ==========================================
  // SIMULATORS & INTERACTION LOGIC
  // ==========================================

  // DevOps Simulator
  const executePipeline = () => {
    if (isDeploying) return;
    setIsDeploying(true);

    const logSequence = [
      { msg: 'Connecting to AWS ECS control plane via secure SSH certificate validation...', type: 'info' as const },
      { msg: 'Validating staging container image hash match... SUCCESS.', type: 'success' as const },
      { msg: 'Initiating blue-green deployment container swap sequence.', type: 'info' as const },
      { msg: 'Running DB Migrations: php artisan migrate --force...', type: 'info' as const },
      { msg: 'Migration updated: "2026_06_24_add_ha_scaling_indexes_to_ledgers" applied.', type: 'success' as const },
      { msg: 'Cache eviction dispatched to Cloudflare Edge layers.', type: 'info' as const },
      { msg: 'Warning: Latency spike detected on secondary DB read replica. Readjusting queue weight.', type: 'warning' as const },
      { msg: 'Warm-up checks returned status code: 200 OK.', type: 'success' as const },
      { msg: 'System deployment successfully routed to 100% load balance. App Live!', type: 'success' as const }
    ];

    setTerminalLogs([
      { timestamp: '16:19:10', message: 'Deploy instruction received. Activating DevOps Pipeline script...', type: 'info' }
    ]);

    let delay = 600;
    logSequence.forEach((step, index) => {
      setTimeout(() => {
        const now = new Date();
        const stamp = now.toTimeString().split(' ')[0];
        setTerminalLogs(prev => [...prev, {
          timestamp: stamp,
          message: step.msg,
          type: step.type
        }]);

        if (index === logSequence.length - 1) {
          setIsDeploying(false);
        }
      }, delay);
      delay += 850;
    });
  };

  // Webhook Simulator Action
  const dispatchSimulateWebhook = () => {
    if (jsonError) {
      setWebhookStatus('error');
      showToastNotification('JSON formatting error. Check syntax before deploying!', 'error');
      return;
    }

    setWebhookStatus('processing');
    showToastNotification('Signature handshake verification initiated...', 'success');

    setTimeout(() => {
      setWebhookStatus('success');
      showToastNotification(`Secure callback validated on ${selectedGateway.toUpperCase()} endpoint! Code: 200 OK`, 'success');
    }, 1400);
  };

  // Toast System Helper
  const showToastNotification = (text: string, type: 'success' | 'error') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Recruiter form to WhatsApp compiler
  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterName || !recruiterContact) {
      showToastNotification('Please fill in both name and callback credentials.', 'error');
      return;
    }

    const compiledSkills = targetSkills.length > 0
        ? targetSkills.join(', ')
        : 'Laravel, DevOps Architecture, Database Performance tuning';

    const rawWhatsAppText = `*🚀 SECURE PORTFOLIO INQUIRY PACKET*

*Inquirer Name:* ${recruiterName}
*Callback Endpoint:* ${recruiterContact}
*Core Engineering Need:* ${projectScope}
*Selected Skill Focus:* ${compiledSkills}

*Message Context:*
_"${customMessage || 'Looking forward to scheduling an engineering assessment review.'}"_

_Transmitted via live interactive app at anuj.dev_`;

    const encodedMessage = encodeURIComponent(rawWhatsAppText);
    const targetUrl = `https://wa.me/919118840397?text=${encodedMessage}`;

    showToastNotification('Compiling technical transmission... Opening WhatsApp API!', 'success');

    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 1000);
  };

  const handleSkillToggleInList = (skillName: string) => {
    if (targetSkills.includes(skillName)) {
      setTargetSkills(prev => prev.filter(s => s !== skillName));
    } else {
      setTargetSkills(prev => [...prev, skillName]);
    }
  };

  // ==========================================
  // RENDER INTERFACE
  // ==========================================
  return (
      <div className="min-h-screen transition-colors duration-300 font-sans bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">

        {/* Injecting CSS Keyframes specifically tailored to replicate visual design in image_8c2142.png */}
        <style>{`
        @keyframes floatCardSlow {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        @keyframes floatCardFast {
          0%, 100% { transform: translateY(0px) rotate(0.5deg); }
          50% { transform: translateY(-7px) rotate(-0.5deg); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float-slow {
          animation: floatCardSlow 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatCardFast 5s ease-in-out infinite;
        }
        .gradient-glow-border {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
      `}</style>

        {/* Background Ambience Globs (Dynamic Blur Effects) */}
        <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-48 left-1/4 w-[450px] h-[450px] rounded-full bg-indigo-600/10 dark:bg-indigo-500/10 blur-[120px] animate-pulse"></div>
          <div className="absolute top-48 right-1/4 w-[350px] h-[350px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px]"></div>
        </div>

        {/* FIXED HEADER WITH GLASSMORPHISM */}
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md border-slate-200/80 bg-white/70 dark:border-slate-900/80 dark:bg-slate-950/70 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            {/* Logo */}
            <a href="#hero" className="flex items-center gap-1.5 focus:outline-none group">
            <span className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
              ANUJ
            </span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              DEV
            </span>
            </a>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors">About</a>
              <a href="#playground" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5">
                <span>Interactive Simulator</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </a>
              <a href="#skills" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors">Tech Matrix</a>
              <a href="#experience" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors">Career</a>
              <a href="#projects" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors">Case Studies</a>
              <a href="#recruiter-form" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors">Connect</a>
            </nav>

            {/* Theme & Actions Toolbar */}
            <div className="flex items-center gap-4">

              {/* Theme Toggle Button */}
              <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl border transition-all text-slate-700 hover:text-indigo-600 hover:bg-slate-100 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
                  aria-label="Toggle Dark/Light Mode"
              >
                {theme === 'dark' ? (
                    // Sun Icon (Show in Dark mode)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5"></circle>
                      <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"></path>
                    </svg>
                ) : (
                    // Moon Icon (Show in Light Mode)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                )}
              </button>

              {/* CTA Deploy Link */}
              <a
                  href="#recruiter-form"
                  className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all duration-150"
              >
                Initiate Project
              </a>

              {/* Mobile Nav Button */}
              <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
              <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 shadow-2xl transition-all">
                <div className="px-6 py-8 flex flex-col gap-4 font-medium">
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400">About</a>
                  <a href="#playground" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400">Pipeline Sandbox</a>
                  <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400">Core Technologies</a>
                  <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400">Career History</a>
                  <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-indigo-600 dark:hover:text-indigo-400">Case Studies</a>
                  <a href="#recruiter-form" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center rounded-xl bg-indigo-600 text-white font-bold tracking-wide">Secure Contact</a>
                </div>
              </div>
          )}
        </header>

        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-10 pb-16 z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Left Info */}
            <div className="lg:col-span-7 flex flex-col justify-center">

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold w-max mb-8 transition-colors">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Available for Senior / Architect Contracts</span>
              </div>

              {/* Name Heading */}
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl xl:text-7xl leading-tight tracking-tight mb-4">
                Anuj <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">Dwivedi</span>
              </h1>

              {/* Profession Title */}
              <h2 className="text-xl sm:text-2xl font-bold font-display text-indigo-600 dark:text-indigo-400 mb-6">
                Senior Full Stack Engineer & Cloud DevOps Architect
              </h2>

              {/* Key Description */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-2xl leading-relaxed mb-8">
                Over 4+ years of real-world production experience designing high-performance backends, secure automated deployment pipelines, and scalable database cluster shards. Master of <strong>Laravel (Livewire)</strong>, <strong>Node.js (MERN)</strong>, and seamless <strong>multinational payment routing engines</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                    href="#playground"
                    className="px-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Launch Deployment Sim</span>
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </a>
                <a
                    href="#projects"
                    className="px-7 py-4 rounded-xl font-bold text-sm transition-all transform hover:-translate-y-0.5 border border-slate-200 dark:border-slate-800 bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Inspect Case Studies
                </a>
              </div>

              {/* Live Contact Quicklinks */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">📍</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Lucknow, UP, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">✉️</span>
                  <a href="mailto:dwivedianuj9118@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono">
                    dwivedianuj9118@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">📞</span>
                  <a href="tel:+919118840397" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono">
                    +91 9118840397
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Right Media Panel precisely matching image_8c2142.png visual composition */}
            <div className="lg:col-span-5 relative flex justify-center items-center py-10">

              {/* Custom Dot Grid overlay context mirroring the high-fidelity backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.06)_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none z-0 rounded-3xl"></div>

              {/* Main Glowing Frame Container */}
              <div className="relative w-80 h-80 sm:w-[410px] sm:h-[410px] rounded-[32px] p-[2.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-emerald-400 shadow-[0_25px_60px_rgba(99,102,241,0.15)] overflow-hidden gradient-glow-border z-10">
                <div className="w-full h-full bg-slate-900 rounded-[30px] overflow-hidden relative">

                  {/* Fallback & Portrait Render Block */}
                  {!imageError ? (
                      <img
                          src="anuj-dwivedi.jpeg"
                          onError={() => setImageError(true)}
                          alt="Anuj Dwivedi Portrait"
                          className="w-full h-full object-cover object-top contrast-[1.04] brightness-[0.98]"
                      />
                  ) : (
                      <div className="w-full h-full bg-slate-950 p-6 flex flex-col justify-between relative text-left">
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                            <code className="text-2xl text-indigo-400 font-extrabold">&lt;AD/&gt;</code>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">
                        AWS CERTIFIED
                      </span>
                        </div>

                        <div className="space-y-4 relative z-10">
                          <div className="font-display font-extrabold text-3xl text-white">
                            Anuj Dwivedi
                          </div>
                          <div className="font-mono text-xs text-indigo-400 space-y-1">
                            <p className="text-emerald-400">// PACKAGIST PACKAGE PUBLISHER</p>
                            <p>M.Tech Cloud Architecture</p>
                            <p>B.Tech Computer Science</p>
                          </div>
                        </div>
                      </div>
                  )}

                  {/* Visual Dark & Purple bottom fade overlay matching image_8c2142.png */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-slate-950/20 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Floating Card 1 (Top Left): "Laravel Expert" strictly replicating image_8c2142.png specs */}
              <div className="absolute -top-4 -left-6 sm:-left-12 bg-slate-950/80 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-4 z-20 animate-float-slow">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-md tracking-wider">
                  L10
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-wide">Laravel Expert</span>
                  <span className="text-[11px] text-emerald-400 font-medium font-mono mt-0.5">Packagist Package Published</span>
                </div>
              </div>

              {/* Floating Card 2 (Bottom Right): "CI / CD Orchestration" strictly replicating image_8c2142.png specs */}
              <div className="absolute -bottom-4 -right-6 sm:-right-12 bg-slate-950/80 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-4 z-20 animate-float-fast">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl border border-emerald-500/20">
                  📦
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-wide">CI / CD Orchestration</span>
                  <span className="text-[11px] text-slate-400 font-medium font-mono mt-0.5">Docker & AWS Certified</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CORE STATISTIC OVERVIEW */}
        <section className="py-12 border-y border-slate-200 dark:border-slate-900 bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm relative z-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

              <div className="text-center">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-indigo-600 dark:text-indigo-400 tracking-tight">
                  4+
                </div>
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-2">
                  Years Commercial Exp
                </p>
              </div>

              <div className="text-center">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                  30%
                </div>
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-2">
                  API Response Speedup
                </p>
              </div>

              <div className="text-center">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-purple-600 dark:text-purple-400 tracking-tight">
                  99.99%
                </div>
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-2">
                  Automated Service Uptime
                </p>
              </div>

              <div className="text-center">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-amber-500 tracking-tight">
                  10+
                </div>
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-2">
                  Fintech API Rail integrations
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE SANDBOX & PLAYGROUND */}
        <section id="playground" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">

            {/* Section Heading */}
            <div className="mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              CORES EXECUTIONS DEMO
            </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mt-2 text-slate-900 dark:text-white">
                Live Interactive Cloud & Gateway Playground
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl font-light">
                Experience the actual pipeline orchestration and transactional webhook flows I design. Interact with both modules to test performance logic.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* TERMINAL PLAYGROUND (LEFT - 7 COLUMNS) */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/50 flex flex-col justify-between overflow-hidden shadow-xl transition-all">

                {/* Terminal Head bar */}
                <div className="bg-slate-100 dark:bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-yellow-400"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-green-500"></span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-3">anuj-deploy-aws-agent.sh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">Active</span>
                  </div>
                </div>

                {/* Server Stats Dashboard Banner */}
                <div className="bg-slate-50 dark:bg-slate-900 px-6 py-3 border-b border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">SIMULATED CPU</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{serverMetrics.cpu}%</span>
                  </div>
                  <div className="border-x border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">MEMORY USED</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{serverMetrics.memory} GB</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">AWS TRAFFIC</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{serverMetrics.network} MB/s</span>
                  </div>
                </div>

                {/* Terminal Logs Interface */}
                <div className="p-6 bg-slate-950 text-slate-200 font-mono text-xs min-h-[300px] max-h-[300px] overflow-y-auto leading-relaxed">
                  <p className="text-slate-500 mb-2">// Executing as authenticated administrator: anuj-dev-root</p>
                  {terminalLogs.map((log, idx) => {
                    let textStyle = 'text-slate-300';
                    let icon = '⚡';
                    if (log.type === 'success') {
                      textStyle = 'text-emerald-400';
                      icon = '✓';
                    } else if (log.type === 'warning') {
                      textStyle = 'text-amber-400';
                      icon = '⚠';
                    } else if (log.type === 'error') {
                      textStyle = 'text-red-400';
                      icon = '❌';
                    }

                    return (
                        <div key={idx} className="mb-2 flex items-start gap-2">
                          <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                          <span className={`${textStyle} shrink-0`}>{icon}</span>
                          <span className={textStyle}>{log.message}</span>
                        </div>
                    );
                  })}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Action trigger panel */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                    <span>Stack: </span>
                    <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 mr-1 text-[10px]">Docker Compose</span>
                    <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 text-[10px]">AWS S3 Cluster</span>
                  </div>
                  <button
                      onClick={executePipeline}
                      disabled={isDeploying}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    {isDeploying ? 'Deploy Pipeline Engaged...' : 'Execute Automated Pipeline'}
                  </button>
                </div>

              </div>

              {/* WEBHOOK SIMULATOR (RIGHT - 5 COLUMNS) */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/50 flex flex-col justify-between overflow-hidden shadow-xl transition-all">

                <div className="p-6 border-b border-slate-200 dark:border-slate-900">
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                    Payment Webhook Verification Sandbox
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    I orchestrate highly secure webhook event validation logic using cryptographic signature checks. Choose a payment rail below to test.
                  </p>
                </div>

                {/* Webhook Selector Tabs */}
                <div className="px-6 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-900 grid grid-cols-4 gap-2">
                  {(['razorpay', 'paypal', 'cashfree', 'stripe'] as const).map(gw => (
                      <button
                          key={gw}
                          onClick={() => handleGatewayChange(gw)}
                          className={`py-2 text-[10px] font-bold uppercase rounded-lg border text-center transition-all ${
                              selectedGateway === gw
                                  ? 'bg-indigo-600 text-white border-indigo-600'
                                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                      >
                        {gw}
                      </button>
                  ))}
                </div>

                {/* Payload Editor Area */}
                <div className="p-6 flex-grow flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Live Editable Event Payload (JSON)
                  </span>
                    {jsonError ? (
                        <span className="text-[10px] text-red-500 font-mono uppercase font-bold">Invalid JSON Structure</span>
                    ) : (
                        <span className="text-[10px] text-emerald-500 font-mono uppercase font-bold">JSON Format Checked</span>
                    )}
                  </div>
                  <textarea
                      value={webhookPayload}
                      onChange={(e) => handlePayloadEdit(e.target.value)}
                      className="w-full flex-grow min-h-[160px] p-4 font-mono text-xs bg-slate-950 text-indigo-400 border border-slate-800 rounded-xl outline-none focus:border-indigo-500/50 resize-none leading-normal"
                  ></textarea>
                </div>

                {/* Action trigger footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                      webhookStatus === 'ready' ? 'bg-slate-400' :
                          webhookStatus === 'processing' ? 'bg-indigo-500 animate-ping' :
                              webhookStatus === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}></span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">
                    {webhookStatus === 'ready' && 'Ready to fire callback'}
                      {webhookStatus === 'processing' && 'Validating parameters'}
                      {webhookStatus === 'success' && 'Authorized (200 OK)'}
                      {webhookStatus === 'error' && 'Execution blocked'}
                  </span>
                  </div>
                  <button
                      onClick={dispatchSimulateWebhook}
                      disabled={webhookStatus === 'processing'}
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95"
                  >
                    Fire Payload
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* CORE SKILL MATRIX & COMPETENCY */}
        <section id="skills" className="py-24 border-y border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/10 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">

            {/* Section Header */}
            <div className="mb-16 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Core Competencies
            </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mt-2 text-slate-900 dark:text-white">
                Enterprise Tech Stack & Expertise
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-xl mx-auto font-light leading-relaxed">
                A robust collection of tools, platforms, and methodologies developed through years of active production-grade coding. Select any competency tag to directly build your spec requirements.
              </p>
            </div>

            {/* Skills Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TECH_CATEGORIES.map((cat, idx) => (
                  <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 p-6 rounded-2xl shadow-md hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all group"
                  >
                    {/* Categorized Visual Badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform ${cat.iconBgClass} ${cat.iconTextClass}`}>
                      {cat.icon}
                    </div>

                    <h3 className="font-display font-bold text-lg mb-4 text-slate-900 dark:text-white">
                      {cat.title}
                    </h3>

                    {/* Tags wrapper list */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => {
                        const isSelected = targetSkills.includes(skill);
                        return (
                            <button
                                key={sIdx}
                                type="button"
                                onClick={() => handleSkillToggleInList(skill)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                                    isSelected
                                        ? 'bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500 dark:text-white shadow-md'
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-500/30 hover:text-indigo-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:border-indigo-400/30 dark:hover:text-indigo-400'
                                }`}
                            >
                              {skill}
                            </button>
                        );
                      })}
                    </div>
                  </div>
              ))}
            </div>

          </div>
        </section>

        {/* PROFESSIONAL HISTORY / TIMELINE */}
        <section id="experience" className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6">

            <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              TRACK RECORD
            </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mt-2 text-slate-900 dark:text-white">
                Professional Work History
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-4 font-light">
                Designing system components, tuning database speeds, and structuring enterprise cloud routes.
              </p>
            </div>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-950 ml-4 sm:ml-6 space-y-12">

              {/* Papaya Coders */}
              <div className="relative pl-8 sm:pl-12">
              <span className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
              </span>

                <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 hover:border-indigo-500/20 transition-all shadow-md">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-950 dark:text-white">
                        Senior Software Developer
                      </h3>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Papaya Coders Pvt Ltd — Custom Consultancy
                    </span>
                    </div>
                    <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                    10/2023 – Present
                  </span>
                  </div>

                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-3 font-normal leading-relaxed list-disc list-inside mb-6">
                    <li>Architected customized enterprise web backends with <strong>Laravel (Livewire)</strong>, Node.js, and React.js.</li>
                    <li>Maximized database efficiency with indexing and Redis caches, driving query speeds up by <strong>30%</strong>.</li>
                    <li>Engineered low-latency Webhook API pipelines validated against standard <strong>BBPS transaction models</strong>.</li>
                    <li>Configured automated container orchestration workflows via Docker targeting highly available <strong>AWS EC2 instances</strong>.</li>
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-900">
                    {['Laravel (Livewire)', 'Node.js', 'Next.js', 'AWS EC2', 'Redis Clusters', 'Docker'].map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                      {t}
                    </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digislots */}
              <div className="relative pl-8 sm:pl-12">
              <span className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-2 border-emerald-500 flex items-center justify-center shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </span>

                <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 hover:border-emerald-500/20 transition-all shadow-md">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-950 dark:text-white">
                        Full Stack Developer
                      </h3>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Digislots Pvt Ltd — Software Studio
                    </span>
                    </div>
                    <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                    09/2021 – 06/2022
                  </span>
                  </div>

                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-3 font-normal leading-relaxed list-disc list-inside mb-6">
                    <li>Designed responsive REST APIs inside TypeScript and Express frameworks deployed on <strong>GCP Compute Engine</strong>.</li>
                    <li>Authored and published reusable open-source helper library extensions on <strong>Packagist Composer</strong> networks.</li>
                    <li>Implemented continuous sync listeners via Firebase DB workflows for real-time web UI modules.</li>
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-900">
                    {['Laravel API', 'TypeScript', 'GCP Compute', 'Composer Packages', 'Firebase Real-Time'].map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                      {t}
                    </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PORTFOLIO PROJECTS / CASE STUDIES */}
        <section id="projects" className="py-24 border-t border-slate-200 dark:border-slate-900 bg-white/30 dark:bg-slate-900/20 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                PROVEN SYSTEMS
              </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mt-2 text-slate-900 dark:text-white">
                  Production-Grade Case Studies
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 max-w-sm font-light leading-relaxed">
                Highly stable backend architectures, open-source packages, and custom integrations active in commercial markets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS_DATA.map((proj, idx) => (
                  <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 rounded-3xl overflow-hidden shadow-xl hover:border-indigo-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Decorative Banner */}
                      <div className={`h-40 bg-gradient-to-tr ${proj.gradient} p-6 flex flex-col justify-between relative overflow-hidden`}>
                    <span className="px-2.5 py-1 rounded bg-black/40 border border-white/20 text-[10px] font-mono text-white tracking-widest uppercase font-bold w-max relative z-10">
                      {proj.subtitle}
                    </span>
                        <h3 className="text-xl font-display font-extrabold text-white relative z-10">
                          {proj.title}
                        </h3>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full border border-white/5 pointer-events-none"></div>
                      </div>

                      <div className="p-6">
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {proj.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {tag}
                      </span>
                        ))}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          proj.statusType === 'success' ? 'text-emerald-500' : 'text-indigo-400'
                      }`}>
                    {proj.status}
                  </span>
                    </div>
                  </div>
              ))}
            </div>

          </div>
        </section>

        {/* EDUCATION & ARCHITECTURAL STRENGTHS */}
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Block: Academic Credentials */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                EDUCATION TRAININGS
              </span>
                <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-2">
                  Academic Foundations
                </h2>
              </div>

              <div className="flex flex-col gap-6">

                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 flex items-start gap-4">
                  <span className="text-3xl mt-1 shrink-0">🎓</span>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                      M.Tech — Cloud Integration & Engineering
                    </h3>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono block mt-1">
                    08/2023 - 05/2025
                  </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      Advanced study in high-throughput transactional scaling, complex database management algorithms, and load distribution methodologies.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 flex items-start gap-4">
                  <span className="text-3xl mt-1 shrink-0">🎓</span>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                      B.Tech — Computer Science & Engineering
                    </h3>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono block mt-1">
                    08/2020 - 05/2023
                  </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      Undergraduate curriculum emphasizing system structures, object-oriented concepts, runtime calculations, and database schema layouts.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Block: Core focus */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                STRENGTH RATINGS
              </span>
                <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-2">
                  Core Architectural Strengths
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="p-5 border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-2xl">
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-2">High Availability Routing</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Configuring robust reverse proxy rules with custom Nginx config, edge caching with Cloudflare, and Docker clustering.
                  </p>
                </div>

                <div className="p-5 border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-2xl">
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-2">Fintech Routing Rules</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Authoring secure payload routers handling payment gateway handshakes, microsecond event logs, and signature checks.
                  </p>
                </div>

                <div className="p-5 border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-2xl">
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-2">DB Indexes & Caches</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Setting up Redis keys, partitioning tables in PostgreSQL, and tuning database memory query limits.
                  </p>
                </div>

                <div className="p-5 border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-2xl">
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-2">Continuous Pipeline Automations</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Building automated runner scripts, Docker building tags, and continuous verification with GitHub action pipelines.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* RECRUITER CONTACT SECURE FORM */}
        <section id="recruiter-form" className="py-24 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/30 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Info Details left */}
            <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              TRANSMIT SPECIFICATION PACKET
            </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
                Ready to construct stable software?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-8">
                Whether you are hiring a senior full-stack developer or setting up cloud architectures, I have the commercial engineering experience to deliver on specifications.
              </p>

              <div className="space-y-4 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <span className="text-slate-600 dark:text-slate-400">Available worldwide (Open to remote or local contracts)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">✉️</span>
                  <a href="mailto:dwivedianuj9118@gmail.com" className="text-indigo-600 dark:text-indigo-400">dwivedianuj9118@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <a href="tel:+919118840397" className="text-slate-600 dark:text-slate-400 font-mono">+91 9118840397</a>
                </div>
              </div>
            </div>

            {/* Form right panel */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-900 shadow-2xl">
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                Interactive Inquiry Dispatch
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Select key skill focuses below. The form automatically compiles a structured payload to my direct endpoint.
              </p>

              <form onSubmit={handleRecruiterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Your Name</label>
                    <input
                        type="text"
                        required
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500/50 text-slate-900 dark:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Email / Callback Contact</label>
                    <input
                        type="text"
                        required
                        value={recruiterContact}
                        onChange={(e) => setRecruiterContact(e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500/50 text-slate-900 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Primary Engineering Scope</label>
                  <select
                      value={projectScope}
                      onChange={(e) => setProjectScope(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500/50 text-slate-900 dark:text-white transition-colors"
                  >
                    <option value="Laravel Backend">Laravel Architecture / Core Backend</option>
                    <option value="Node.js MERN">Node.js MERN / Real-time match engines</option>
                    <option value="AWS DevOps">Docker Containers & AWS DevOps automation</option>
                    <option value="Payment Gateway">Payment Gateway integrations</option>
                    <option value="Contract Engineer">Full Stack engineering contract</option>
                  </select>
                </div>

                {/* Dynamic Tag list selection indicator */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Target Stack Focus Selected ({targetSkills.length})
                  </label>
                  {targetSkills.length === 0 ? (
                      <p className="text-[10px] text-slate-400 font-semibold mb-2">
                        💡 Click on items in the "Enterprise Tech Stack & Expertise" section above to dynamically link required skills!
                      </p>
                  ) : (
                      <div className="flex flex-wrap gap-1.5 mb-2 max-h-[80px] overflow-y-auto p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                        {targetSkills.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[9px] font-semibold flex items-center gap-1">
                        <span>{s}</span>
                        <button type="button" onClick={() => handleSkillToggleInList(s)} className="hover:text-red-400 text-[8px] font-bold">✕</button>
                      </span>
                        ))}
                      </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Project Specs / Scheduling Message</label>
                  <textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Outline scheduling options or system parameters here..."
                      className="w-full h-24 px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-indigo-500/50 text-slate-900 dark:text-white transition-colors resize-none leading-normal"
                  ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all"
                >
                  Transmit Specification Packet
                </button>
              </form>

              {/* Custom toast notifications inside component container */}
              {toastMessage && (
                  <div className={`mt-4 p-4 rounded-xl border flex items-center justify-between text-xs font-mono transition-all duration-300 ${
                      toastMessage.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                  }`}>
                    <span>{toastMessage.text}</span>
                    <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold ml-2">✕</button>
                  </div>
              )}

            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 text-xs text-slate-500 dark:text-slate-400 font-mono transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p>© 2026 Anuj Dwivedi — Engineered for performance.</p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/dwivedianuj9118" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/dwivedianuj9118" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">LinkedIn</a>
              <a href="mailto:dwivedianuj9118@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Email Support</a>
            </div>
          </div>
        </footer>

      </div>
  );
}
