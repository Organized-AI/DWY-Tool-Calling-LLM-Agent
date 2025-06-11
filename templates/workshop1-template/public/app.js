/**
 * Frontend JavaScript for Workshop 1: Project Planning Systems
 * Interactive web interface for AI-enhanced project planning
 */

// API Configuration
const API_BASE = window.location.origin + '/api';

// Global state
let currentProjects = [];
let currentRepos = [];
let isDemoMode = true;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    console.log('🚀 Initializing Project Planning Systems...');
    
    // Check if we're in demo mode
    try {
        const response = await fetch(`${API_BASE}/health`);
        const health = await response.json();
        isDemoMode = health.demoMode;
        
        // Update demo badge visibility
        const demoBadge = document.getElementById('demo-badge');
        if (demoBadge) {
            demoBadge.style.display = isDemoMode ? 'inline-block' : 'none';
        }
        
        console.log(`📋 Demo Mode: ${isDemoMode ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.warn('Could not determine demo mode:', error);
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    await loadDashboardData();
    await loadProjects();
    await loadRepositories();
    
    console.log('✅ App initialized successfully');
    showNotification('Welcome to Project Planning Systems!', 'success');
}

function setupEventListeners() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Form submissions
    const createProjectForm = document.getElementById('create-project-form');
    if (createProjectForm) {
        createProjectForm.addEventListener('submit', handleCreateProject);
    }
    
    const createRepoForm = document.getElementById('create-repo-form');
    if (createRepoForm) {
        createRepoForm.addEventListener('submit', handleCreateRepository);
    }
    
    const patentAnalysisForm = document.getElementById('patent-analysis-form');
    if (patentAnalysisForm) {
        patentAnalysisForm.addEventListener('submit', handlePatentAnalysis);
    }
    
    // Modal close buttons
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            close.closest('.modal').classList.remove('active');
        });
    });
    
    // Click outside modal to close
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Tab Management
function switchTab(tabName) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabName);
    });
    
    // Load tab-specific data
    switch (tabName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'github':
            loadRepositories();
            break;
        case 'patents':
            // Patent data is mostly static for demo
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Dashboard Functions
async function loadDashboardData() {
    try {
        // Update stats from projects data
        const projects = await fetchProjects();
        const activeProjects = projects.filter(p => p.status !== 'completed').length;
        
        // Update dashboard stats
        updateElement('active-projects', activeProjects);
        updateElement('optimization-score', '88.9');
        updateElement('time-saved', '7.2');
        updateElement('cost-savings', '$8.4k');
        
        // Update activity feed
        updateRecentActivity();
        updateAIInsights();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function updateRecentActivity() {
    const activities = [
        {
            icon: '✅',
            text: 'Project "AI Marketing Assistant" optimized',
            time: '2 hours ago'
        },
        {
            icon: '🐙',
            text: 'GitHub repository created',
            time: '1 day ago'
        },
        {
            icon: '💡',
            text: 'Patent analysis completed',
            time: '2 days ago'
        },
        {
            icon: '📊',
            text: 'Resource allocation optimized',
            time: '3 days ago'
        }
    ];
    
    const activityList = document.getElementById('recent-activity');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <span class="activity-icon">${activity.icon}</span>
                <span class="activity-text">${activity.text}</span>
                <span class="activity-time">${activity.time}</span>
            </div>
        `).join('');
    }
}

function updateAIInsights() {
    const insights = [
        {
            icon: '⚡',
            text: 'Task reordering can save 3.2 days'
        },
        {
            icon: '👥',
            text: 'Resource allocation 91% optimized'
        },
        {
            icon: '🎯',
            text: 'Critical path reduced by 12%'
        },
        {
            icon: '💡',
            text: 'New optimization opportunity detected'
        }
    ];
    
    const insightsList = document.getElementById('ai-insights');
    if (insightsList) {
        insightsList.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <span class="insight-icon">${insight.icon}</span>
                <span class="insight-text">${insight.text}</span>
            </div>
        `).join('');
    }
}

// Project Functions
async function loadProjects() {
    try {
        showLoading(true);
        currentProjects = await fetchProjects();
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
        showNotification('Failed to load projects', 'error');
    } finally {
        showLoading(false);
    }
}

async function fetchProjects() {
    const response = await fetch(`${API_BASE}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
}

function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    if (!projectsList) return;
    
    if (currentProjects.length === 0) {
        projectsList.innerHTML = `
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first AI-enhanced project to get started!</p>
                <button class="btn btn-primary" onclick="showCreateProject()">
                    ➕ Create Project
                </button>
            </div>
        `;
        return;
    }
    
    projectsList.innerHTML = currentProjects.map(project => `
        <div class="project-card" onclick="viewProject('${project.id}')">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.name}</div>
                    <div class="project-status ${project.status}">${formatStatus(project.status)}</div>
                </div>
            </div>
            <div class="project-description">${project.description}</div>
            
            <div class="project-stats">
                <div class="project-stat">
                    <div class="project-stat-value">${project.tasks?.length || 0}</div>
                    <div class="project-stat-label">Tasks</div>
                </div>
                <div class="project-stat">
                    <div class="project-stat-value">${project.team?.length || 0}</div>
                    <div class="project-stat-label">Team</div>
                </div>
            </div>
            
            <div class="project-progress">
                <div class="project-progress-label">Progress</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${calculateProgress(project)}%">
                        ${calculateProgress(project)}%
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function calculateProgress(project) {
    if (!project.tasks || project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / project.tasks.length) * 100);
}

function formatStatus(status) {
    const statusMap = {
        'planning': 'Planning',
        'in_progress': 'In Progress',
        'completed': 'Completed',
        'on_hold': 'On Hold'
    };
    return statusMap[status] || status;
}

async function handleCreateProject(event) {
    event.preventDefault();
    
    try {
        showLoading(true);
        
        const formData = new FormData(event.target);
        const goals = formData.get('goals') ? formData.get('goals').split('\n').filter(g => g.trim()) : [];
        const team = Array.from(event.target.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        
        const projectData = {
            name: formData.get('name'),
            description: formData.get('description'),
            goals: goals,
            timeline: formData.get('timeline'),
            team: team
        };
        
        const response = await fetch(`${API_BASE}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        
        if (!response.ok) throw new Error('Failed to create project');
        
        const newProject = await response.json();
        currentProjects.unshift(newProject);
        renderProjects();
        hideCreateProject();
        showNotification(`Project "${newProject.name}" created successfully!`, 'success');
        
        // Clear form
        event.target.reset();
        
    } catch (error) {
        console.error('Error creating project:', error);
        showNotification('Failed to create project', 'error');
    } finally {
        showLoading(false);
    }
}

function showCreateProject() {
    const modal = document.getElementById('create-project-modal');
    if (modal) modal.classList.add('active');
}

function hideCreateProject() {
    const modal = document.getElementById('create-project-modal');
    if (modal) modal.classList.remove('active');
}

async function viewProject(projectId) {
    try {
        const response = await fetch(`${API_BASE}/projects/${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project details');
        
        const project = await response.json();
        showProjectDetails(project);
        
    } catch (error) {
        console.error('Error fetching project:', error);
        showNotification('Failed to load project details', 'error');
    }
}

function showProjectDetails(project) {
    // For now, show a simple alert. In a full implementation, this would open a detailed modal
    alert(`Project: ${project.name}\n\nStatus: ${formatStatus(project.status)}\nTasks: ${project.tasks?.length || 0}\nTeam: ${project.team?.length || 0} members`);
}

// GitHub Functions
async function loadRepositories() {
    try {
        showLoading(true);
        currentRepos = await fetchRepositories();
        renderRepositories();
        updateRepoCount();
    } catch (error) {
        console.error('Error loading repositories:', error);
        showNotification('Failed to load repositories', 'error');
    } finally {
        showLoading(false);
    }
}

async function fetchRepositories() {
    const response = await fetch(`${API_BASE}/github/repos`);
    if (!response.ok) throw new Error('Failed to fetch repositories');
    return await response.json();
}

function renderRepositories() {
    const reposList = document.getElementById('repos-list');
    if (!reposList) return;
    
    if (currentRepos.length === 0) {
        reposList.innerHTML = `
            <div class="empty-state">
                <h3>No repositories found</h3>
                <p>Create your first GitHub repository to get started!</p>
                <button class="btn btn-primary" onclick="showCreateRepo()">
                    🐙 Create Repository
                </button>
            </div>
        `;
        return;
    }
    
    reposList.innerHTML = currentRepos.map(repo => `
        <div class="repo-card">
            <div class="repo-name">${repo.name}</div>
            <div class="repo-description">${repo.description || 'No description'}</div>
            <div class="repo-stats">
                <span>⭐ ${repo.stars || 0}</span>
                <span>🍴 ${repo.forks || 0}</span>
                <span>📝 ${repo.language || 'Unknown'}</span>
                <span>${repo.private ? '🔒 Private' : '🌐 Public'}</span>
            </div>
            <a href="${repo.url}" target="_blank" class="repo-url">${repo.url}</a>
        </div>
    `).join('');
}

function updateRepoCount() {
    const repoCountElement = document.getElementById('repo-count');
    if (repoCountElement) {
        repoCountElement.textContent = currentRepos.length;
    }
}

async function handleCreateRepository(event) {
    event.preventDefault();
    
    try {
        showLoading(true);
        
        const formData = new FormData(event.target);
        const repoData = {
            name: formData.get('name'),
            description: formData.get('description'),
            private: formData.has('private')
        };
        
        const response = await fetch(`${API_BASE}/github/create-repo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(repoData)
        });
        
        if (!response.ok) throw new Error('Failed to create repository');
        
        const newRepo = await response.json();
        
        if (isDemoMode) {
            // Add demo repo to list
            currentRepos.unshift({
                name: repoData.name,
                description: repoData.description,
                url: newRepo.url,
                private: repoData.private,
                stars: 0,
                forks: 0,
                language: 'JavaScript',
                created_at: new Date().toISOString()
            });
            renderRepositories();
            updateRepoCount();
        } else {
            // Reload from API
            await loadRepositories();
        }
        
        hideCreateRepo();
        showNotification(`Repository "${repoData.name}" created successfully!`, 'success');
        
        // Clear form
        event.target.reset();
        
    } catch (error) {
        console.error('Error creating repository:', error);
        showNotification('Failed to create repository', 'error');
    } finally {
        showLoading(false);
    }
}

function showCreateRepo() {
    const modal = document.getElementById('create-repo-modal');
    if (modal) modal.classList.add('active');
}

function hideCreateRepo() {
    const modal = document.getElementById('create-repo-modal');
    if (modal) modal.classList.remove('active');
}

// Patent Functions
async function handlePatentAnalysis(event) {
    event.preventDefault();
    
    try {
        showLoading(true);
        
        const formData = new FormData(event.target);
        const analysisData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            inventors: formData.get('inventors') ? formData.get('inventors').split(',').map(i => i.trim()) : []
        };
        
        const response = await fetch(`${API_BASE}/deepinvent/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(analysisData)
        });
        
        if (!response.ok) throw new Error('Failed to analyze innovation');
        
        const analysis = await response.json();
        showPatentAnalysisResults(analysis);
        hidePatentAnalysis();
        
        // Clear form
        event.target.reset();
        
    } catch (error) {
        console.error('Error analyzing innovation:', error);
        showNotification('Failed to analyze innovation', 'error');
    } finally {
        showLoading(false);
    }
}

function showPatentAnalysisResults(analysis) {
    const resultsHtml = `
        <h3>Patent Analysis Results</h3>
        <div style="margin: 20px 0;">
            <h4>${analysis.innovation_title || 'Your Innovation'}</h4>
            <div style="margin: 16px 0;">
                <strong>Patentability Score:</strong> 
                <span style="color: ${analysis.patentability_score > 0.7 ? '#10b981' : analysis.patentability_score > 0.5 ? '#f59e0b' : '#ef4444'}; font-weight: bold;">
                    ${Math.round(analysis.patentability_score * 100)}%
                </span>
            </div>
            <div style="margin: 16px 0;">
                <strong>Similar Patents:</strong> ${analysis.similar_patents}
            </div>
            <div style="margin: 16px 0;">
                <strong>Assessment:</strong> ${analysis.novelty_assessment}
            </div>
            <div style="margin: 16px 0;">
                <strong>Estimated Cost:</strong> ${analysis.estimated_filing_cost || analysis.estimated_cost}
            </div>
            ${analysis.recommendations ? `
                <div style="margin: 16px 0;">
                    <strong>Recommendations:</strong>
                    <ul style="margin: 8px 0; padding-left: 20px;">
                        ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
    
    // Show results in an alert for now. In a full implementation, this would be a proper modal
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = resultsHtml;
    alert(tempDiv.textContent.replace(/\s+/g, ' ').trim());
    
    showNotification('Patent analysis completed successfully!', 'success');
}

function showPatentAnalysis() {
    const modal = document.getElementById('patent-analysis-modal');
    if (modal) modal.classList.add('active');
}

function hidePatentAnalysis() {
    const modal = document.getElementById('patent-analysis-modal');
    if (modal) modal.classList.remove('active');
}

// Analytics Functions
function loadAnalytics() {
    // Analytics data is mostly static for demo
    updateAnalyticsCharts();
}

function updateAnalyticsCharts() {
    // Animate chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.opacity = '1';
            bar.style.transform = 'scaleY(1)';
        }, index * 200);
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scaleX(1)';
        }, index * 300);
    });
}

function refreshAnalytics() {
    showLoading(true);
    setTimeout(() => {
        loadAnalytics();
        showLoading(false);
        showNotification('Analytics data refreshed', 'success');
    }, 1500);
}

// Utility Functions
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.toggle('active', show);
    }
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="font-weight: 500; margin-bottom: 4px;">
            ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
            ${type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        <div>${message}</div>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // Add click to close
    notification.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
}

// Add slide out animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.showCreateProject = showCreateProject;
window.hideCreateProject = hideCreateProject;
window.showCreateRepo = showCreateRepo;
window.hideCreateRepo = hideCreateRepo;
window.showPatentAnalysis = showPatentAnalysis;
window.hidePatentAnalysis = hidePatentAnalysis;
window.refreshAnalytics = refreshAnalytics;
window.viewProject = viewProject;

console.log('📱 Frontend JavaScript loaded successfully');
