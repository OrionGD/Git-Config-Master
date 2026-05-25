import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_CONFIGS, MODULE_IDS } from './constants';
import { playSynthSound } from './audio';
import { TeamMember, KioskLog, CommitItem, BadgeItem, CampaignItem } from './types';

// Import separated modular subcomponents
import { DigitalCanopy } from './components/DigitalCanopy';
import { CertificateCard } from './components/CertificateCard';
import { LandingPage } from './components/LandingPage';
import { CampaignsView } from './components/CampaignsView';
import { ReactorView } from './components/ReactorView';
import { BadgesView } from './components/BadgesView';
import { GlossaryView } from './components/GlossaryView';
import { ScopesView } from './components/ScopesView';
import { RegistryEditorView } from './components/RegistryEditorView';
import { TeamWorkspaceView } from './components/TeamWorkspaceView';
import { DiagnosticsView } from './components/DiagnosticsView';
import { CheatsheetView } from './components/CheatsheetView';
import { SandboxPipeline } from './components/SandboxPipeline';

const ALL_30_QUESTIONS = [
  {
    q: "If you set user.name in both local .git/config and global ~/.gitconfig, which value does Git use when committing in that repository?",
    opts: [
      "A) Local value overrides Global",
      "B) Global value overrides Local",
      "C) System value overrides both",
      "D) It throws a configuration breach error"
    ],
    ans: 0
  },
  {
    q: "Between global ~/.gitconfig and system-wide /etc/gitconfig, which configuration file has higher priority and overrides the other?",
    opts: [
      "A) Global overrides System",
      "B) System overrides Global",
      "C) They merge with equal priority",
      "D) Neither, Git ignores both files"
    ],
    ans: 0
  },
  {
    q: "You run: git -c user.name='AdHoc' commit. How does Git resolve the username for this specific commit?",
    opts: [
      "A) Uses 'AdHoc' because CLI parameter overrides config files",
      "B) Uses Local config file setting",
      "C) Uses Global config file setting",
      "D) Fails due to precedence syntax violation"
    ],
    ans: 0
  },
  {
    q: "If GIT_AUTHOR_NAME environment variable is set, how does it interact with user.name configured in .git/config?",
    opts: [
      "A) GIT_AUTHOR_NAME environment variable overrides user.name",
      "B) user.name configuration overrides GIT_AUTHOR_NAME",
      "C) Both are joined together as one string",
      "D) Git prompts the operator to resolve the name manually"
    ],
    ans: 0
  },
  {
    q: "Where is the local repository-specific configuration file stored by default?",
    opts: [
      "A) Within the .git/config file in the repository root",
      "B) In the user home directory ~/.gitconfig",
      "C) In the machine-wide /etc/gitconfig settings",
      "D) In the index cache database .git/index"
    ],
    ans: 0
  },
  {
    q: "On Unix-like operating systems, what is the default file path for your global Git configurations?",
    opts: [
      "A) ~/.gitconfig",
      "B) /etc/gitconfig",
      "C) .git/config",
      "D) ~/.config/git/system"
    ],
    ans: 0
  },
  {
    q: "Which command shows both the values and the specific config file paths where those values are defined?",
    opts: [
      "A) git config --list --show-origin",
      "B) git config --get-all",
      "C) git show-branch --verbose",
      "D) git config --where"
    ],
    ans: 0
  },
  {
    q: "What command opens your default terminal text editor to modify the global Git configuration file directly?",
    opts: [
      "A) git config --global --edit",
      "B) git config --global --write",
      "C) git edit --global --text",
      "D) git config --system --open"
    ],
    ans: 0
  },
  {
    q: "How do you completely remove a configuration key (e.g. user.email) from your global settings?",
    opts: [
      "A) git config --global --unset user.email",
      "B) git config --global --remove user.email",
      "C) git config --global --delete user.email",
      "D) git config --global --clear user.email"
    ],
    ans: 0
  },
  {
    q: "If a config key has multiple values defined, which command safely unsets all of them at once?",
    opts: [
      "A) git config --global --unset-all key",
      "B) git config --global --unset key",
      "C) git config --global --delete-all key",
      "D) git config --global --purge key"
    ],
    ans: 0
  },
  {
    q: "Which configuration key determines the default editor used by Git for writing commit messages?",
    opts: [
      "A) core.editor",
      "B) git.editor",
      "C) user.editor",
      "D) terminal.editor"
    ],
    ans: 0
  },
  {
    q: "Which config parameter resolves line ending conversion differences between Windows and macOS/Linux systems?",
    opts: [
      "A) core.autocrlf",
      "B) core.eol",
      "C) core.lineendings",
      "D) core.cr"
    ],
    ans: 0
  },
  {
    q: "Which parameter configures the default branch name used when initializing a brand new repository with git init?",
    opts: [
      "A) init.defaultBranch",
      "B) core.defaultBranch",
      "C) git.defaultBranch",
      "D) init.branchName"
    ],
    ans: 0
  },
  {
    q: "What occurs under the hood when you run git add . on your working directory files?",
    opts: [
      "A) Files are copied to the Index/Staging area and tracked",
      "B) A commit is created instantly in the local database",
      "C) Files are uploaded to the remote server branch",
      "D) Files are compiled into compiled binaries"
    ],
    ans: 0
  },
  {
    q: "In a git status output, what visual category displays files that have been modified but NOT staged?",
    opts: [
      "A) 'Changes not staged for commit'",
      "B) 'Changes to be committed'",
      "C) 'Untracked files'",
      "D) 'Diverged branches'"
    ],
    ans: 0
  },
  {
    q: "You deleted a file locally. Which command records this file deletion directly in the staging index?",
    opts: [
      "A) git rm file",
      "B) git clean file",
      "C) git checkout file",
      "D) git purge file"
    ],
    ans: 0
  },
  {
    q: "What does a commit represent in Git's Directed Acyclic Graph (DAG) database history?",
    opts: [
      "A) An immutable cryptographic snapshot of the staged Index files",
      "B) A temporary patch backup that expires in 30 days",
      "C) A list of remote server file links",
      "D) An alias configuration variable"
    ],
    ans: 0
  },
  {
    q: "Which flag allows you to replace your last commit message or add newly staged files to it directly?",
    opts: [
      "A) --amend",
      "B) --modify",
      "C) --replace",
      "D) --override"
    ],
    ans: 0
  },
  {
    q: "Which command shows a condensed, single-line log of all your repository's commits and hashes?",
    opts: [
      "A) git log --oneline",
      "B) git log --condensed",
      "C) git log --short",
      "D) git log --hash"
    ],
    ans: 0
  },
  {
    q: "What does 'origin' represent in a standard command like git push origin main?",
    opts: [
      "A) An alias link pointing to the remote repository upstream URL",
      "B) The name of your local storage drive",
      "C) The initial commit hash metadata",
      "D) The default user profile configuration"
    ],
    ans: 0
  },
  {
    q: "What standard action takes place when you execute git push origin branchName?",
    opts: [
      "A) Uploads local commit database history to the remote repository branch",
      "B) Stages all working directory changes in the index",
      "C) Resets the local branch configuration values",
      "D) Clones a remote repository URL locally"
    ],
    ans: 0
  },
  {
    q: "What is the primary difference between git fetch and git pull?",
    opts: [
      "A) fetch downloads metadata only; pull downloads and merges it instantly",
      "B) pull is secure; fetch is insecure",
      "C) fetch deletes local files; pull preserves them",
      "D) There is no structural difference"
    ],
    ans: 0
  },
  {
    q: "Your workspace has multiple untracked files. How do you delete them all recursively and safely?",
    opts: [
      "A) git clean -fd",
      "B) git reset --hard",
      "C) git rm --cached .",
      "D) git restore --all"
    ],
    ans: 0
  },
  {
    q: "How do you discard all local unstaged modifications in your working files, reverting them back to the last commit?",
    opts: [
      "A) git restore .",
      "B) git commit --revert",
      "C) git clean -x",
      "D) git push --force"
    ],
    ans: 0
  },
  {
    q: "You accidentally added a secret file to the Staging Index. Which command unstages it safely without discarding edits?",
    opts: [
      "A) git reset secret.txt",
      "B) git rm secret.txt",
      "C) git checkout secret.txt",
      "D) git revert secret.txt"
    ],
    ans: 0
  },
  {
    q: "If a username is configured both in the system scope and in the local scope, which scope configuration wins?",
    opts: [
      "A) Local config scope overrides System config scope",
      "B) System config scope overrides Local config scope",
      "C) Both are combined in order",
      "D) The configuration throws an environment error"
    ],
    ans: 0
  },
  {
    q: "What causes a merge conflict in Git?",
    opts: [
      "A) Competing changes made to the exact same line of a file in different branches",
      "B) A mismatch in the user.email configurations",
      "C) Having too many local commits in history",
      "D) Push attempts to a branch with a different name"
    ],
    ans: 0
  },
  {
    q: "Which Git configuration parameter defines a global file path for your user-wide pattern exclusion ignore list?",
    opts: [
      "A) core.excludesfile",
      "B) core.ignorefile",
      "C) git.ignorepath",
      "D) excludes.global"
    ],
    ans: 0
  },
  {
    q: "Which parameter controls whether Git tracks executable file permission changes (+x) in your index?",
    opts: [
      "A) core.fileMode",
      "B) core.permissions",
      "C) git.trackpermissions",
      "D) core.exe"
    ],
    ans: 0
  },
  {
    q: "How do you verify only your global configurations in your terminal?",
    opts: [
      "A) git config --global --list",
      "B) git config --list --system",
      "C) git config --local --get",
      "D) git config --show"
    ],
    ans: 0
  }
];

export default function App() {
  const [showDashboard, setShowDashboard] = useState<boolean>(() => {
    return sessionStorage.getItem('git_show_dashboard') === 'true';
  });
  const [activeModule, setActiveModule] = useState(MODULE_IDS.INTRO);
  const [configs, setConfigs] = useState<{ [key: string]: string }>(() => {
    const saved = sessionStorage.getItem('git_configs');
    return saved ? JSON.parse(saved) : INITIAL_CONFIGS;
  });
  const [mobileStepperOpen, setMobileStepperOpen] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [dragStartRotation, setDragStartRotation] = useState(0);

  // sound toggle state
  const [soundsOn, setSoundsOn] = useState(true);

  // SaaS Team seats
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { email: 'godfrey@orion-os.org', role: 'Admin', status: 'Active', avatar: 'GT' },
    { email: 'prithvi@orion-os.org', role: 'Developer', status: 'Active', avatar: 'PR' },
    { email: 'harihar@orion-os.org', role: 'Security', status: 'Active', avatar: 'HR' }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Developer' | 'Security'>('Developer');

  // =========================================================
  // ⚙️ GAMIFICATION STATES
  // =========================================================
  const [xp, setXp] = useState<number>(() => {
    const saved = sessionStorage.getItem('git_xp');
    return saved ? Number(saved) : 50;
  });
  const [level, setLevel] = useState<number>(() => {
    const saved = sessionStorage.getItem('git_level');
    return saved ? Number(saved) : 1;
  });
  const [masteredMissions, setMasteredMissions] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('git_mastered_missions');
    return saved ? JSON.parse(saved) : [];
  });
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('git_earned_badges');
    return saved ? JSON.parse(saved) : [];
  });

  // checklist state helpers
  const [hasUnsetConfig, setHasUnsetConfig] = useState<boolean>(() => {
    return sessionStorage.getItem('git_unset_config') === 'true';
  });

  // screen shake controller on error
  const [shakeOn, setShakeOn] = useState(false);

  // visual pipeline states
  const [animationState, setAnimationState] = useState<'idle' | 'adding' | 'committing' | 'pushing'>('idle');
  const [workingFiles, setWorkingFiles] = useState<string[]>(['index.js', 'styles.css']);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [localCommits, setLocalCommits] = useState<CommitItem[]>([]);
  const [remoteCommits, setRemoteCommits] = useState<CommitItem[]>([]);
  const [hasResetPerformed, setHasResetPerformed] = useState<boolean>(() => {
    return sessionStorage.getItem('git_reset_performed') === 'true';
  });
  const [visualLogs, setVisualLogs] = useState<string[]>([
    'SYSTEM ONLINE // Audit sequence initialized.',
    'Working Directory holds modified files. Run [git add] to catalog snapshots.'
  ]);

  // Registry form custom states
  const [newRegistryKey, setNewRegistryKey] = useState('');
  const [newRegistryValue, setNewRegistryValue] = useState('');
  const [kioskLogs, setKioskLogs] = useState<KioskLog[]>([
    { id: '1', time: new Date().toLocaleTimeString(), msg: 'SAAS: Workspace session loaded.', type: 'info' },
    { id: '2', time: new Date().toLocaleTimeString(), msg: 'SECURITY: Geofence synchronization operational.', type: 'success' }
  ]);

  // credential seal display
  const [certificateOpen, setCertificateOpen] = useState(false);

  // =========================================================
  // 🕹️ REACTOR GAME STATE
  // =========================================================
  const [reactorState, setReactorState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [reactorTemp, setReactorTemp] = useState(50);
  const [reactorTimer, setReactorTimer] = useState(45);
  const [reactorQuestionIdx, setReactorQuestionIdx] = useState(0);
  const [reactorScore, setReactorScore] = useState(0);
  const [reactorQuestions, setReactorQuestions] = useState<{ q: string; opts: string[]; ans: number }[]>(ALL_30_QUESTIONS.slice(0, 5));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio utility wrapper
  const triggerSound = (type: 'click' | 'success' | 'levelup' | 'error' | 'reactor') => {
    if (soundsOn) {
      playSynthSound(type);
    }
  };

  // Level progression check
  useEffect(() => {
    const nextLevelThreshold = level * 200;
    if (xp >= nextLevelThreshold) {
      setLevel(prev => prev + 1);
      triggerSound('levelup');
      addKioskLog(`LEVEL UP! You are now level ${level + 1}!`, 'success');
      unlockBadge('precedence');
    }
  }, [xp, level]);

  // 🏆 AUTOMATIC LIVE ACHIEVEMENT SEALS SYSTEM
  useEffect(() => {
    // 1. Configuration Primer (arborist)
    if (configs['user.name'] && configs['user.name'] !== 'Learner' && configs['user.email'] && configs['user.email'] !== 'learner@example.com') {
      unlockBadge('arborist');
    }
    // 2. Staging Area (oxygenizer)
    if (stagedFiles.length > 0 || localCommits.length > 0 || remoteCommits.length > 0) {
      unlockBadge('oxygenizer');
    }
    // 3. Commit Log (carbon)
    if (localCommits.length > 0 || remoteCommits.length > 0) {
      unlockBadge('carbon');
    }
    // 4. Remote Upstream (canopy)
    if (remoteCommits.length > 0) {
      unlockBadge('canopy');
    }
    // 5. Precedence Sage (precedence)
    if (level >= 2) {
      unlockBadge('precedence');
    }
    // 6. Reactor Master (reactor)
    if (reactorState === 'victory') {
      unlockBadge('reactor');
    }
  }, [configs, stagedFiles, localCommits, remoteCommits, level, reactorState]);

  // 💾 SESSION STORAGE SYNCHRONIZATION LOOP
  useEffect(() => {
    sessionStorage.setItem('git_show_dashboard', String(showDashboard));
    sessionStorage.setItem('git_configs', JSON.stringify(configs));
    sessionStorage.setItem('git_xp', String(xp));
    sessionStorage.setItem('git_level', String(level));
    sessionStorage.setItem('git_mastered_missions', JSON.stringify(masteredMissions));
    sessionStorage.setItem('git_earned_badges', JSON.stringify(earnedBadges));
    sessionStorage.setItem('git_unset_config', String(hasUnsetConfig));
    sessionStorage.setItem('git_reset_performed', String(hasResetPerformed));
  }, [showDashboard, configs, xp, level, masteredMissions, earnedBadges, hasUnsetConfig, hasResetPerformed]);

  // Timer loop for Reactor game
  useEffect(() => {
    if (reactorState === 'playing') {
      timerRef.current = setInterval(() => {
        setReactorTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setReactorState('gameover');
            triggerSound('error');
            triggerShake();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reactorState]);

  // Auto trigger game over if temperature spikes to 100%
  useEffect(() => {
    if (reactorTemp >= 100 && reactorState === 'playing') {
      setReactorState('gameover');
      triggerSound('error');
      triggerShake();
    }
  }, [reactorTemp, reactorState]);

  const triggerShake = () => {
    setShakeOn(true);
    setTimeout(() => setShakeOn(false), 450);
  };

  const addLog = (msg: string) => {
    setVisualLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const addKioskLog = (msg: string, type: 'success' | 'info' | 'warn') => {
    setKioskLogs(prev => [
      { id: Math.random().toString(), time: new Date().toLocaleTimeString(), msg, type },
      ...prev
    ].slice(0, 15));
  };

  const handleGitAdd = () => {
    if (workingFiles.length === 0) {
      addLog('WARNING: No modified files found in Working Directory.');
      triggerSound('error');
      return;
    }
    setAnimationState('adding');
    addLog('Executing [git add .] -> Indexing local workspace files...');
    triggerSound('click');
    
    setTimeout(() => {
      setStagedFiles(prev => [...prev, ...workingFiles]);
      setWorkingFiles([]);
      setAnimationState('idle');
      addLog('SUCCESS: Files staging complete. Changes added to Index.');
      triggerSound('success');
      setXp(prev => prev + 30);
      unlockBadge('oxygenizer');
    }, 1800);
  };

  const handleGitCommit = () => {
    if (stagedFiles.length === 0) {
      addLog('WARNING: Staging Area empty. Run [git add] first.');
      triggerSound('error');
      return;
    }
    setAnimationState('committing');
    addLog('Executing [git commit -m "feat: user profile"] -> Creating new local commit...');
    triggerSound('click');

    setTimeout(() => {
      const newHash = Math.random().toString(16).substring(2, 7).toUpperCase();
      const newCommit: CommitItem = { hash: newHash, msg: 'feat: user profile' };
      setLocalCommits(prev => [...prev, newCommit]);
      setStagedFiles([]);
      setAnimationState('idle');
      addLog(`SUCCESS: Commit created. HASH: [${newHash}] -> Changes saved locally.`);
      triggerSound('success');
      setXp(prev => prev + 50);
      unlockBadge('carbon');
    }, 1800);
  };

  const handleGitPush = () => {
    if (localCommits.length === 0) {
      addLog('WARNING: No local commits available. Sync blocked.');
      triggerSound('error');
      return;
    }
    setAnimationState('pushing');
    addLog('Executing [git push origin main] -> Transferring local commits to remote origin...');
    triggerSound('click');

    setTimeout(() => {
      setRemoteCommits(prev => [...prev, ...localCommits]);
      setLocalCommits([]);
      setAnimationState('idle');
      addLog('SUCCESS: Upstream remote synchronization complete.');
      triggerSound('success');
      setXp(prev => prev + 80);
      unlockBadge('canopy');
    }, 1800);
  };

  const handleReset = () => {
    setWorkingFiles(['index.js', 'styles.css']);
    setStagedFiles([]);
    setLocalCommits([]);
    setRemoteCommits([]);
    setAnimationState('idle');
    setHasResetPerformed(true);
    triggerSound('click');
    addLog('PIPELINE RESET // Local directory reverted to initial sandbox state.');
  };

  const handleLogout = () => {
    // Clear all session storage values
    sessionStorage.clear();
    
    // Reset all state variables to defaults
    setConfigs(INITIAL_CONFIGS);
    setLevel(1);
    setXp(0);
    setMasteredMissions([]);
    setEarnedBadges([]);
    setWorkingFiles(['index.js', 'styles.css']);
    setStagedFiles([]);
    setLocalCommits([]);
    setRemoteCommits([]);
    setHasResetPerformed(false);
    setHasUnsetConfig(false);
    setReactorState('idle');
    setReactorTemp(50);
    setReactorScore(0);
    setReactorQuestionIdx(0);
    
    // Redirect to Landing Page
    setShowDashboard(false);
    
    // Log & alert sound
    triggerSound('error');
    addKioskLog('SESSION TERMINATED: Purged all secure registries cache.', 'warn');
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
    setDragStartAngle(angle);
    setDragStartRotation(rotationAngle);
    setIsDragging(true);
    circleRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
    const diff = angle - dragStartAngle;
    const diffDegrees = diff * (180 / Math.PI);
    setRotationAngle(dragStartRotation + diffDegrees);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (circleRef.current) {
      circleRef.current.releasePointerCapture(e.pointerId);
    }
    const snapped = Math.round(rotationAngle / 40) * 40;
    setRotationAngle(snapped);
    triggerSound('success');
  };

  const unlockBadge = (badgeId: string) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges(prev => [...prev, badgeId]);
      addKioskLog(`ACHIEVEMENT EARNED: Unlocked badge "${badgeId.toUpperCase()}"`, 'success');
      setXp(prev => prev + 60);
    }
  };

  const handleReactorAnswer = (optIndex: number) => {
    const currentQ = reactorQuestions[reactorQuestionIdx];
    if (!currentQ) return;
    if (optIndex === currentQ.ans) {
      triggerSound('success');
      setReactorTemp(prev => Math.max(0, prev - 15));
      setReactorScore(prev => prev + 1);
      addKioskLog(`REACTOR DIAGNOSTICS: Layer ${reactorQuestionIdx + 1} stabilized.`, 'success');
      
      if (reactorQuestionIdx >= reactorQuestions.length - 1) {
        setReactorState('victory');
        setXp(prev => prev + 250);
        unlockBadge('reactor');
      } else {
        setReactorQuestionIdx(prev => prev + 1);
      }
    } else {
      triggerSound('error');
      triggerShake();
      setReactorTemp(prev => prev + 25);
      addKioskLog(`REACTOR CRITICAL: Breach warning triggered at Layer ${reactorQuestionIdx + 1}!`, 'warn');
    }
  };

  const startReactorGame = () => {
    // 1. Shuffle all 30 questions randomly
    const shuffledPool = [...ALL_30_QUESTIONS].sort(() => Math.random() - 0.5);
    
    // 2. Select 5 questions and shuffle their option order dynamically while keeping correctness
    const selected = shuffledPool.slice(0, 5).map(item => {
      const pairedOptions = item.opts.map((opt, oidx) => ({
        text: opt,
        isCorrect: oidx === item.ans
      }));
      const shuffledPairs = pairedOptions.sort(() => Math.random() - 0.5);
      return {
        q: item.q,
        opts: shuffledPairs.map(p => p.text),
        ans: shuffledPairs.findIndex(p => p.isCorrect)
      };
    });

    setReactorQuestions(selected);
    setReactorState('playing');
    setReactorTemp(50);
    setReactorTimer(45);
    setReactorQuestionIdx(0);
    setReactorScore(0);
    triggerSound('click');
  };

  const handleUpdateConfig = (key: string, val: string) => {
    if (!key.trim()) return;
    setConfigs(prev => ({ ...prev, [key]: val }));
    
    // Terminal execution simulation
    addKioskLog(`$ git config --global ${key} "${val}"`, 'info');
    addKioskLog(`[global] ${key} updated to "${val}"`, 'success');
    
    triggerSound('success');
    unlockBadge('arborist');
  };

  const handleRemoveConfig = (key: string) => {
    setConfigs(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    setHasUnsetConfig(true);
    
    // Terminal execution simulation
    addKioskLog(`$ git config --global --unset ${key}`, 'warn');
    addKioskLog(`[global] ${key} profile credential purged`, 'info');
    
    triggerSound('click');
  };

  const handleAddSeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;

    const initials = newMemberEmail.substring(0, 2).toUpperCase();
    const newMember: TeamMember = {
      email: newMemberEmail.trim(),
      role: newMemberRole,
      status: 'Pending',
      avatar: initials
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    setNewMemberEmail('');
    addKioskLog(`INVITED new seat user: ${newMember.email}`, 'info');
    triggerSound('success');
  };

  // Quest Campaigns database
  const campaigns: CampaignItem[] = [
    {
      id: 'm1',
      title: 'Mission 01 // Configuration Prioritization',
      desc: 'Master the Local, Global, and System priorities of Git repository configurations.',
      steps: [
        { text: 'Set global username parameter globally', check: !!(configs['user.name'] && configs['user.name'] !== 'Learner'), type: 'config' },
        { text: 'Configure work email override locally', check: !!(configs['user.email'] && configs['user.email'] !== 'learner@example.com'), type: 'config' },
        { text: 'Verify scope priority overrides active', check: !!(configs['user.name'] && configs['user.email']) }
      ],
      xp: 150,
      badge: 'arborist',
      difficulty: 'basic'
    },
    {
      id: 'm2',
      title: 'Mission 02 // Local File Staging',
      desc: 'Track local workspace file alterations and prepare changes in the Staging Area.',
      steps: [
        { text: 'Stage all modified files using [git add]', check: stagedFiles.length > 0 || localCommits.length > 0 || remoteCommits.length > 0, action: 'add' },
        { text: 'Verify staging index has active staged files', check: stagedFiles.length > 0 || localCommits.length > 0 }
      ],
      xp: 150,
      badge: 'oxygenizer',
      difficulty: 'basic'
    },
    {
      id: 'm3',
      title: 'Mission 03 // Commit Logs',
      desc: 'Register staging indexes as permanent, immutable commits on local branches.',
      steps: [
        { text: 'Stage modified files', check: stagedFiles.length > 0 || localCommits.length > 0 || remoteCommits.length > 0, action: 'add' },
        { text: 'Run [git commit] to seal a local commit node', check: localCommits.length > 0 || remoteCommits.length > 0, action: 'commit' }
      ],
      xp: 150,
      badge: 'carbon',
      difficulty: 'basic'
    },
    {
      id: 'm4',
      title: 'Mission 04 // Core Editor Setup',
      desc: 'Configure your primary default terminal editor parameter using global registry overrides.',
      steps: [
        { text: 'Set core.editor registry key to vim, nano, or code', check: !!configs['core.editor'] && configs['core.editor'] !== 'vim', type: 'config' }
      ],
      xp: 150,
      badge: 'arborist',
      difficulty: 'basic'
    },
    {
      id: 'm5',
      title: 'Mission 05 // Default Branch Setup',
      desc: 'Configure default initial branch name parameters for new repositories globally.',
      steps: [
        { text: 'Set init.defaultBranch configuration parameter globally', check: !!configs['init.defaultBranch'], type: 'config' }
      ],
      xp: 150,
      badge: 'arborist',
      difficulty: 'basic'
    },
    {
      id: 'm6',
      title: 'Mission 06 // Status Diagnostics',
      desc: 'Audit repository status and identify active working directory file modifications.',
      steps: [
        { text: 'Verify local workspace directory holds staged or modified changes', check: workingFiles.length > 0 || stagedFiles.length > 0 }
      ],
      xp: 150,
      badge: 'oxygenizer',
      difficulty: 'basic'
    },
    {
      id: 'm7',
      title: 'Mission 07 // Remote Upstream Synchronization',
      desc: 'Synchronize active branch commit history with upstream remote servers.',
      steps: [
        { text: 'Generate local commit snapshots', check: localCommits.length > 0 || remoteCommits.length > 0, action: 'commit' },
        { text: 'Push local commits to remote upstream repository', check: remoteCommits.length > 0, action: 'push' }
      ],
      xp: 200,
      badge: 'canopy',
      difficulty: 'intermediate'
    },
    {
      id: 'm8',
      title: 'Mission 08 // Configuration Unsetting',
      desc: 'Revoke and delete active configuration parameters to clean up workspace scopes.',
      steps: [
        { text: 'Unset or remove a configuration parameter key in variables editor', check: hasUnsetConfig, action: 'unset' }
      ],
      xp: 200,
      badge: 'precedence',
      difficulty: 'intermediate'
    },
    {
      id: 'm9',
      title: 'Mission 09 // Conflict Stabilization Layer 01',
      desc: 'Resolve basic precedence override scenarios inside the stabilization arena.',
      steps: [
        { text: 'Stabilize Conflict Reactor by correctly resolving diagnostic layers', check: reactorState === 'victory' || reactorState === 'playing', action: 'reactor' }
      ],
      xp: 200,
      badge: 'reactor',
      difficulty: 'intermediate'
    },
    {
      id: 'm10',
      title: 'Mission 10 // Exclusion Ignore Pattern',
      desc: 'Define a user-wide pattern exclusion ignore list configuration globally.',
      steps: [
        { text: 'Configure global excludesfile path under standard configurations', check: !!configs['core.excludesfile'], type: 'config' }
      ],
      xp: 200,
      badge: 'arborist',
      difficulty: 'intermediate'
    },
    {
      id: 'm11',
      title: 'Mission 11 // File Permissions Auditing',
      desc: 'Configure index permission checks to ignore local executable mode changes.',
      steps: [
        { text: 'Disable core.fileMode parameter checks in local config scope', check: configs['core.fileMode'] === 'false', type: 'config' }
      ],
      xp: 200,
      badge: 'oxygenizer',
      difficulty: 'intermediate'
    },
    {
      id: 'm12',
      title: 'Mission 12 // Workspace Reset Protocol',
      desc: 'Trigger directory pipeline restores to revert working files back to standard sandbox index templates.',
      steps: [
        { text: 'Ensure directory is fully recovered with basic staging index', check: workingFiles.includes('index.js') && stagedFiles.length === 0 }
      ],
      xp: 200,
      badge: 'precedence',
      difficulty: 'intermediate'
    },
    {
      id: 'm13',
      title: 'Mission 13 // Hard Branch Reset Recovery',
      desc: 'Restore staging index and revert all branch commits using sandbox reset pipelines.',
      steps: [
        { text: 'Perform a hard reset to cleanly revert working directory and commits', check: hasResetPerformed && workingFiles.length === 2 && stagedFiles.length === 0 && localCommits.length === 0, action: 'reset' }
      ],
      xp: 300,
      badge: 'precedence',
      difficulty: 'advanced'
    },
    {
      id: 'm14',
      title: 'Mission 14 // Precedence Override Bypass',
      desc: 'Force override global configuration priorities with custom local scope overrides.',
      steps: [
        { text: 'Verify both standard config profile variables are active', check: !!(configs['user.name'] && configs['user.name'] !== 'Learner' && configs['user.email'] && configs['user.email'] !== 'learner@example.com'), type: 'config' },
        { text: 'Complete a core Conflict Reactor stabilization audit victory', check: reactorState === 'victory' }
      ],
      xp: 300,
      badge: 'precedence',
      difficulty: 'advanced'
    },
    {
      id: 'm15',
      title: 'Mission 15 // Rebase Integration Scenario',
      desc: 'Correctly resolve rebase integration and linear commit history merge scenarios.',
      steps: [
        { text: 'Stabilize at least 3 diagnostic layers inside the Conflict Reactor', check: reactorScore >= 3, action: 'reactor' }
      ],
      xp: 300,
      badge: 'reactor',
      difficulty: 'advanced'
    },
    {
      id: 'm16',
      title: 'Mission 16 // System Scope Authorization',
      desc: 'Manage wide administrative permissions using system scope overrides.',
      steps: [
        { text: 'Register or unset multiple config parameter settings in variables registry', check: hasUnsetConfig || Object.keys(configs).length > 4 }
      ],
      xp: 300,
      badge: 'precedence',
      difficulty: 'advanced'
    },
    {
      id: 'm17',
      title: 'Mission 17 // Ultimate Synchronization Fusion',
      desc: 'Demonstrate total mastery of remote branch synchronizations, configuration resets, and reactor stabilization loops.',
      steps: [
        { text: 'Master remote branch history sync logs', check: remoteCommits.length > 0 },
        { text: 'Achieve stable active reactor containment status', check: reactorState === 'victory' || reactorState === 'playing' },
        { text: 'Unset active parameters to audit config overrides', check: hasUnsetConfig }
      ],
      xp: 500,
      badge: 'reactor',
      difficulty: 'advanced'
    }
  ];

  const badgeLibrary: BadgeItem[] = [
    { id: 'arborist', label: 'Configuration Primer', icon: '🎖️', desc: 'Configure custom precedence configurations.', unlock: 'M1 complete or variables set.' },
    { id: 'oxygenizer', label: 'Staging Area', icon: '🍃', desc: 'Stage modified changes into staging area.', unlock: 'Run [git add] successfully.' },
    { id: 'carbon', label: 'Commit Log', icon: '🪵', desc: 'Create local commits to save repository state.', unlock: 'Run [git commit] successfully.' },
    { id: 'canopy', label: 'Remote Upstream', icon: '☀️', desc: 'Sync local branches to the upstream server.', unlock: 'Run [git push] successfully.' },
    { id: 'precedence', label: 'Precedence Sage', icon: '🧙', desc: 'Achieve level progression and config override skills.', unlock: 'Automatically unlocked at Level 2.' },
    { id: 'reactor', label: 'Reactor Master', icon: '🛡️', desc: 'Resolve configuration overrides and conflicts.', unlock: 'Complete reactor game victory.' }
  ];

  // Active status scores
  const soilHealth = configs['user.name'] && configs['user.email'] ? 95 : 40;
  const airPurity = workingFiles.length === 0 ? 100 : 65;

  const currentLevelProgress = xp % (level * 200);
  const levelUpThreshold = level * 200;
  const progressPercent = Math.min(100, Math.round((currentLevelProgress / levelUpThreshold) * 100));

  const masteredMissionsCount = campaigns.filter(camp => {
    return camp.steps.every(s => s.check === undefined || s.check === true);
  }).length;

  const COMPASS_ITEMS = [
    { id: MODULE_IDS.INTRO, title: 'Missions Portal', icon: '🌿', desc: 'Simulate staging, overrides, and linear commits history.' },
    { id: 'reactor', title: 'Conflict Reactor', icon: '🕹️', desc: 'Resolve priority conflicts and Git command precedence merges.' },
    { id: 'badges', title: 'Achievements Shelf', icon: '🎖️', desc: 'Review earned milestones and dynamic credentials.' },
    { id: 'glossary', title: 'Git Glossary', icon: '📖', desc: 'Master essential Git terms and definition indexes.' },
    { id: MODULE_IDS.SCOPES, title: 'Priority Scopes', icon: '📊', desc: 'Prioritize local, global, and system configuration directories.' },
    { id: 'registry-editor', title: 'Variables Registry', icon: '⚙️', desc: 'Manage override scopes and reset profile credentials.' },
    { id: 'team-workspace', title: 'Team Workspace', icon: '👥', desc: 'Pre-populate team roles and secure workspace seals.' },
    { id: MODULE_IDS.CHEATSHEET, title: 'Commands Reference', icon: '📜', desc: 'Review standard command guides for fast reference.' },
    { id: MODULE_IDS.TROUBLESHOOTING, title: 'System Diagnostics', icon: '🩺', desc: 'Troubleshoot identity logs and precedence conflicts.' }
  ];

  const normalizedRotation = ((rotationAngle % 360) + 360) % 360;
  const selectedIdx = (9 - Math.round(normalizedRotation / 40)) % 9;
  const currentSelected = COMPASS_ITEMS[selectedIdx];

  if (!showDashboard) {
    return <LandingPage onEnter={() => setShowDashboard(true)} triggerSound={triggerSound} />;
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[#ecfdf5] transition-colors duration-500 overflow-x-hidden ${shakeOn ? 'shake-active' : ''}`}>
      
      {/* 🌿 TOP METRICS HUD */}
      <header className="p-4 sm:p-6 border-b border-emerald-950/60 flex flex-col md:flex-row items-center justify-between bg-[var(--color-bg-primary)]/90 backdrop-blur-lg sticky top-0 z-40 gap-4">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <h1 className="text-base font-black text-white tracking-tighter flex items-center cursor-pointer select-none" onClick={() => { triggerSound('click'); setShowDashboard(false); }}>
            <span className="bg-emerald-500 w-8 h-8 flex items-center justify-center rounded-lg mr-3 text-emerald-950 font-mono font-bold animate-pulse">
              G
            </span>
            <span className="font-mono tracking-wider text-sm">GIT ACADEMY CONTROLLER</span>
          </h1>
        </div>

        {/* Global XP & Rank Progress Bar HUD */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto flex-1 max-w-xl justify-end">
          <div className="flex items-center gap-3 w-full sm:max-w-xs">
            <div className="text-right whitespace-nowrap">
              <span className="text-[10px] font-black text-emerald-400 block uppercase font-mono leading-none">
                Lvl {level} {level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : level === 3 ? 'Advanced' : level === 4 ? 'Professional' : 'Master'}
              </span>
              <span className="text-[8px] font-mono text-emerald-600 tracking-wider uppercase">{xp} / {levelUpThreshold} XP</span>
            </div>
            {/* ProgressBar */}
            <div className="w-full h-2.5 bg-slate-900/80 rounded-full border border-emerald-950/60 overflow-hidden progress-glow-bar">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Active Repository Diagnostics Metrics */}
          <div className="flex items-center gap-4 text-center font-mono">
            <div>
              <span className="text-[7px] text-emerald-500/50 uppercase block font-bold">Profile Settings</span>
              <span className="text-xs font-black text-emerald-400">{soilHealth}%</span>
            </div>
            <div className="h-6 w-px bg-emerald-950/60"></div>
            <div>
              <span className="text-[7px] text-emerald-500/50 uppercase block font-bold">Pipeline Status</span>
              <span className="text-xs font-black text-emerald-400">{airPurity}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* 🧭 Horizontal Stepper Navigator */}
      <nav className="border-b border-emerald-950/40 bg-[var(--color-bg-primary)]/80 backdrop-blur-md sticky top-[73px] z-30 py-3.5 px-6">
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
          {[
            { id: MODULE_IDS.INTRO, title: 'Learning Missions', icon: '🌿' },
            { id: 'reactor', title: 'Conflict Reactor', icon: '🕹️' },
            { id: 'badges', title: 'Achievements', icon: '🎖️' },
            { id: 'glossary', title: 'Glossary', icon: '📖' },
            { id: MODULE_IDS.SCOPES, title: 'Priority Scopes', icon: '📊' },
            { id: 'registry-editor', title: 'Variables Registry', icon: '⚙️' },
            { id: 'team-workspace', title: 'Team Workspace', icon: '👥' },
            { id: MODULE_IDS.CHEATSHEET, title: 'Command Cheatsheet', icon: '📜' },
            { id: MODULE_IDS.TROUBLESHOOTING, title: 'Diagnostics Panel', icon: '🩺' }
          ].map((m) => {
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => { triggerSound('click'); setActiveModule(m.id); }}
                className={`px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/40 shadow-primary'
                    : 'bg-transparent text-emerald-100/50 border-transparent hover:border-emerald-950/60 hover:text-emerald-400'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile quick telemetry log indicator */}
        <div className="sm:hidden flex justify-between items-center px-2 py-1 font-mono text-[8px] text-emerald-400/70 border-t border-emerald-950/20 mt-2">
          <span>SECTOR TELEMETRY // SECURE</span>
          <span className="animate-pulse text-amber-500">TAP COMPASS WIDGET TO NAVIGATE</span>
        </div>
      </nav>

      {/* 🌿 MAIN ENVIRONMENT GRID */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 sm:p-10 grid grid-cols-1 xl:grid-cols-4 gap-10 items-start">
        {/* Left Spanning Quest Stream (spans 3 columns) */}
        <div className="xl:col-span-3 space-y-10">
          
          {/* STATE-AWARE SUBSECTION RENDER */}
          {(() => {
            switch (activeModule) {
              case MODULE_IDS.INTRO:
                return (
                  <div className="space-y-10">
                    <CampaignsView 
                      campaigns={campaigns}
                      masteredMissions={masteredMissions}
                      setMasteredMissions={setMasteredMissions}
                      xp={xp}
                      setXp={setXp}
                      unlockBadge={unlockBadge}
                      triggerSound={triggerSound}
                      addKioskLog={addKioskLog}
                      workingFiles={workingFiles}
                      stagedFiles={stagedFiles}
                      localCommits={localCommits}
                      remoteCommits={remoteCommits}
                      handleGitAdd={handleGitAdd}
                      handleGitCommit={handleGitCommit}
                      handleGitPush={handleGitPush}
                      setActiveModule={setActiveModule}
                      hasUnsetConfig={hasUnsetConfig}
                      reactorState={reactorState}
                    />

                    <SandboxPipeline 
                      workingFiles={workingFiles}
                      stagedFiles={stagedFiles}
                      localCommits={localCommits}
                      animationState={animationState}
                      handleGitAdd={handleGitAdd}
                      handleGitCommit={handleGitCommit}
                      handleGitPush={handleGitPush}
                      handleReset={handleReset}
                      visualLogs={visualLogs}
                    />

                    {/* Mastered Certification Card */}
                    {masteredMissionsCount === campaigns.length && (
                      <div className="pt-6">
                        <CertificateCard studentName={configs['user.name'] || 'Orion Student'} />
                      </div>
                    )}
                  </div>
                );

              case 'reactor':
                return (
                  <ReactorView 
                    reactorState={reactorState}
                    reactorTemp={reactorTemp}
                    reactorTimer={reactorTimer}
                    reactorQuestionIdx={reactorQuestionIdx}
                    reactorScore={reactorScore}
                    reactorQuestions={reactorQuestions}
                    startReactorGame={startReactorGame}
                    handleReactorAnswer={handleReactorAnswer}
                    setActiveModule={setActiveModule}
                    triggerSound={triggerSound}
                  />
                );

              case 'badges':
                return (
                  <BadgesView 
                    badgeLibrary={badgeLibrary}
                    earnedBadges={earnedBadges}
                    setEarnedBadges={setEarnedBadges}
                    configs={configs}
                    stagedFiles={stagedFiles}
                    localCommits={localCommits}
                    remoteCommits={remoteCommits}
                    reactorState={reactorState}
                    level={level}
                    addKioskLog={addKioskLog}
                    triggerSound={triggerSound}
                  />
                );

              case 'glossary':
                return <GlossaryView />;

              case MODULE_IDS.SCOPES:
                return <ScopesView />;

              case 'registry-editor':
                return (
                  <RegistryEditorView 
                    configs={configs}
                    handleUpdateConfig={handleUpdateConfig}
                    handleRemoveConfig={handleRemoveConfig}
                    newRegistryKey={newRegistryKey}
                    setNewRegistryKey={setNewRegistryKey}
                    newRegistryValue={newRegistryValue}
                    setNewRegistryValue={setNewRegistryValue}
                    kioskLogs={kioskLogs}
                    triggerSound={triggerSound}
                  />
                );

              case 'team-workspace':
                return (
                  <TeamWorkspaceView 
                    teamMembers={teamMembers}
                    setTeamMembers={setTeamMembers}
                    newMemberEmail={newMemberEmail}
                    setNewMemberEmail={setNewMemberEmail}
                    newMemberRole={newMemberRole}
                    setNewMemberRole={setNewMemberRole}
                    handleAddSeat={handleAddSeat}
                    addKioskLog={addKioskLog}
                    triggerSound={triggerSound}
                  />
                );

              case MODULE_IDS.CHEATSHEET:
                return <CheatsheetView />;

              case MODULE_IDS.TROUBLESHOOTING:
                return <DiagnosticsView onLogout={handleLogout} />;

              default:
                return (
                  <div className="flex flex-col items-center justify-center text-center py-20 font-mono">
                    <span className="text-6xl animate-spin block mb-6">⚙️</span>
                    <p className="text-[10px] text-emerald-500 tracking-[0.4em] uppercase font-bold">Initialization sequence active...</p>
                  </div>
                );
            }
          })()}
        </div>

        {/* =========================================================
            🌿 RIGHT BIOME SIDEBAR CONTROL PANEL
        ========================================================= */}
        <div className="space-y-8 xl:sticky xl:top-[160px] z-20">
          
          {/* Pathway mastery progress card */}
          <div className="p-6 border border-emerald-950/60 rounded-[2rem] bg-transparent space-y-4 font-mono shadow-inner">
            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Mastery Progress</span>
            <h4 className="text-xs font-bold text-white uppercase">Academy Milestones</h4>
            <div className="flex justify-between items-center text-[10px] text-emerald-100/40">
              <span>Completed Missions:</span>
              <span className="font-bold text-white">{masteredMissions.length} / {campaigns.length}</span>
            </div>
            
            <div className="w-full h-2 bg-slate-900 rounded-full border border-emerald-950/60 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${(masteredMissions.length / campaigns.length) * 100}%` }}></div>
            </div>

            {masteredMissions.length === campaigns.length ? (
              <button
                onClick={() => {
                  triggerSound('levelup');
                  setCertificateOpen(true);
                  addKioskLog("CREDENTIAL MODAL OVERLAY: Displaying sealed certificate.", "success");
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
              >
                View Academy Certificate
              </button>
            ) : (
              <span className="text-[8.5px] italic text-emerald-600 block text-center">Complete all {campaigns.length} missions to unlock certificate</span>
            )}
          </div>

          {/* Biome Canopy Visualizer Widget */}
          <DigitalCanopy
            workingFiles={workingFiles}
            stagedFiles={stagedFiles}
            localCommits={localCommits}
            remoteCommits={remoteCommits}
            animationState={animationState}
            configs={configs}
          />

          {/* Active registry parameters */}
          <div className="p-6 border border-emerald-950/60 rounded-[2rem] bg-transparent space-y-4 font-mono shadow-inner">
            <header className="flex items-center justify-between">
              <h4 className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active Variable Registry</h4>
              <span className="text-[8px] text-emerald-700 font-bold">SHA-256</span>
            </header>
            <div className="space-y-2">
              {Object.entries(configs).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-emerald-950/30 text-[9px] gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <button 
                      onClick={() => handleRemoveConfig(k)}
                      title="Unset Variable"
                      className="text-red-500 hover:text-red-400 font-bold text-[8px] hover:scale-110 transition-transform active:scale-90"
                    >
                      🗑️
                    </button>
                    <span className="text-emerald-500 font-bold truncate">{k}</span>
                  </div>
                  <span className="text-emerald-100/50 block truncate max-w-[100px]" title={v}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sound Synthesizer control */}
          <div className="p-6 border border-emerald-950/60 rounded-[2rem] bg-transparent flex justify-between items-center font-mono">
            <div className="space-y-0.5">
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest block">System Diagnostics</span>
              <p className="text-[9px] text-emerald-100/40">Sound Synthesis: {soundsOn ? 'Active' : 'Disabled'}</p>
            </div>
            <button
              onClick={() => {
                setSoundsOn(!soundsOn);
                if (!soundsOn) {
                  playSynthSound('click');
                }
              }}
              className={`px-3 py-1.5 border rounded-lg text-[8px] font-bold uppercase transition-all ${
                soundsOn 
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                  : 'border-emerald-950 text-emerald-800'
              }`}
            >
              Toggle
            </button>
          </div>
        </div>
      </main>

      {/* 📜 CERTIFICATE POPUP FULLSCREEN MODAL OVERLAY */}
      {certificateOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--color-overlay-dark)] backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <CertificateCard 
            studentName={configs['user.name'] || 'Orion Student'} 
            onClose={() => setCertificateOpen(false)}
          />
        </div>
      )}

      {/* 🧭 Global Floating Compass Dial Nav Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => { triggerSound('click'); setMobileStepperOpen(!mobileStepperOpen); }}
          className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl shadow-2xl transition-all duration-300 ${
            mobileStepperOpen 
              ? 'border-amber-400 bg-amber-950/80 text-amber-400 rotate-180 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
              : 'border-emerald-400 bg-slate-950/90 backdrop-blur text-emerald-400 hover:scale-110 hover:border-emerald-300 animate-bounce'
          }`}
          title="Open Radial Navigation Wheel"
        >
          🧭
        </button>
      </div>

      {/* 🧭 Sci-Fi Rotatable Compass Dial Modal overlay */}
      {mobileStepperOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-lg animate-fadeIn p-4 font-mono">
          <div className="absolute top-6 right-6">
            <button 
              onClick={() => { triggerSound('click'); setMobileStepperOpen(false); }}
              className="w-10 h-10 rounded-full border border-emerald-950/80 bg-slate-900 text-emerald-400 flex items-center justify-center text-lg hover:border-emerald-500 transition-all shadow-md active:scale-90"
            >
              ✕
            </button>
          </div>

          <div className="text-center max-w-sm mb-6 space-y-2 select-none">
            <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest block bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit mx-auto">
              Sector Navigation
            </span>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Holographic Steering Wheel</h3>
            <p className="text-emerald-100/40 text-[9px] leading-relaxed">
              Drag or rotate the wheel circular dial to lock onto target biome sector registry scopes, then tap core to enter.
            </p>
          </div>

          {/* Glowing Top Selection Pointers */}
          <div className="flex flex-col items-center mb-2 z-10 select-none">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-500 animate-bounce"></div>
            <span className="text-[8px] font-black text-amber-500 uppercase tracking-wider mt-1">ALIGNMENT TARGET</span>
          </div>

          {/* Circular dial container */}
          <div 
            ref={circleRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ touchAction: 'none' }}
            className="relative w-80 h-80 rounded-full border-4 border-dashed border-emerald-950 flex items-center justify-center cursor-grab active:cursor-grabbing bg-slate-950/50 shadow-[0_0_50px_rgba(16,185,129,0.05)] select-none transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(16,185,129,0.1)]"
          >
            {/* Center Core Launch Trigger */}
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                setActiveModule(currentSelected.id);
                setMobileStepperOpen(false);
                triggerSound('success');
              }}
              className="absolute w-28 h-28 rounded-full border-4 border-emerald-950 bg-slate-900 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 z-50 hover:border-emerald-400 group active:scale-95 cursor-pointer pointer-events-auto p-2"
            >
              <span className="text-3xl filter drop-shadow-[0_4px_6px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-300">
                {currentSelected.icon}
              </span>
              <span className="text-[7.5px] font-black text-emerald-400 tracking-wider mt-1.5 uppercase leading-tight line-clamp-2">
                {currentSelected.title.split('//')[0]}
              </span>
            </button>

            {/* Rotating Wheel Group */}
            <div 
              style={{ transform: `rotate(${rotationAngle}deg)`, transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              className="absolute w-full h-full rounded-full flex items-center justify-center"
            >
              {COMPASS_ITEMS.map((m, idx) => {
                const angle = (idx * 40) - 90; // Spaced 40 degrees, start at -90 (12 o'clock)
                const r = 110; // radius
                const x = r * Math.cos(angle * (Math.PI / 180));
                const y = r * Math.sin(angle * (Math.PI / 180));
                const isCurrent = idx === selectedIdx;

                return (
                  <button
                    key={m.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModule(m.id);
                      setMobileStepperOpen(false);
                      triggerSound('success');
                    }}
                    style={{ 
                      transform: `translate(${x}px, ${y}px) rotate(${-rotationAngle}deg)` 
                    }}
                    className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg shadow-lg pointer-events-auto transition-all duration-300 ${
                      isCurrent 
                        ? 'border-amber-400 bg-amber-950/90 text-amber-300 scale-125 shadow-[0_0_15px_rgba(245,158,11,0.5)] ring-2 ring-amber-500/20 z-40' 
                        : 'border-emerald-950 bg-[#12221b]/90 text-emerald-100/70 hover:border-emerald-500 hover:text-emerald-300 z-30'
                    }`}
                    title={m.title}
                  >
                    {m.icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active target descriptor display */}
          <div className="mt-8 text-center max-w-xs space-y-1 bg-slate-950/80 border border-emerald-950/80 p-4 rounded-2xl shadow-xl select-none">
            <span className="text-[7px] text-emerald-500 font-black uppercase tracking-widest">Locked Target System:</span>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{currentSelected.title}</h4>
            <p className="text-[9px] text-emerald-100/50 leading-relaxed max-w-[240px] mx-auto">{currentSelected.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}