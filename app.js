// App State and Data
const appState = {
  currentView: "home",
  currentFilter: "all",
  posts: [
    {
      id: 1,
      title: "Starting Strong: First Semester Reflections",
      date: "2026-01-15",
      category: "college",
      tags: ["college", "learning"],
      excerpt:
        "The first semester is complete. Here's what I learned about time management, prioritization, and maintaining momentum when things get tough.",
      content: "Full blog post content here...",
    },
    {
      id: 2,
      title: "Building My First Full-Stack Application",
      date: "2025-12-20",
      category: "projects",
      tags: ["projects", "coding"],
      excerpt:
        "From concept to deployment, documenting the journey of creating a complete application from scratch. The challenges, the breakthroughs, and everything in between.",
      content: "Full blog post content here...",
    },
    {
      id: 3,
      title: "Why I Code Every Single Day",
      date: "2025-11-30",
      category: "mindset",
      tags: ["mindset", "growth"],
      excerpt:
        "Consistency beats intensity. Here's why I made the commitment to code daily and how it's transformed my skills faster than I ever thought possible.",
      content: "Full blog post content here...",
    },
    {
      id: 4,
      title: "The Tech Stack I'm Mastering",
      date: "2025-11-10",
      category: "learning",
      tags: ["learning", "coding"],
      excerpt:
        "A breakdown of the technologies I'm focusing on and why each one matters for my goals. From React to databases, here's my learning roadmap.",
      content: "Full blog post content here...",
    },
    {
      id: 5,
      title: "Balancing Classes and Side Projects",
      date: "2025-10-25",
      category: "college",
      tags: ["college", "projects"],
      excerpt:
        "How to make time for personal projects while keeping up with coursework. The system I use to stay productive without burning out.",
      content: "Full blog post content here...",
    },
    {
      id: 6,
      title: "Learning in Public: Embracing the Journey",
      date: "2025-10-05",
      category: "mindset",
      tags: ["mindset", "growth"],
      excerpt:
        "Why I decided to share my progress publicly and how it's changed my approach to learning. Accountability is a powerful motivator.",
      content: "Full blog post content here...",
    },
  ],
  stats: [
    { label: "Days Coding", value: "365+", description: "Consecutive days" },
    { label: "Projects Built", value: "12", description: "And counting" },
    { label: "Skills Learned", value: "24", description: "Technologies" },
    { label: "Hours Invested", value: "1000+", description: "This year" },
  ],
  timeline: [
    {
      date: "Jan 2026",
      title: "Current Focus",
      desc: "Advanced full-stack development & system design",
    },
    {
      date: "Fall 2025",
      title: "Deep Dive",
      desc: "Data structures, algorithms, and backend architecture",
    },
    {
      date: "Summer 2025",
      title: "Foundation",
      desc: "Intensive coding bootcamp and first internship",
    },
    {
      date: "Spring 2025",
      title: "Discovery",
      desc: "Found my passion for software development",
    },
    {
      date: "2024",
      title: "The Beginning",
      desc: "Started college, began learning to code",
    },
  ],
};

// Navigation System
function initializeNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  const views = document.querySelectorAll(".view");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.view;
      switchView(targetView);

      // Update active state
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function switchView(viewName) {
  const views = document.querySelectorAll(".view");
  views.forEach((view) => {
    view.classList.remove("active");
  });

  const targetView = document.getElementById(viewName);
  if (targetView) {
    targetView.classList.add("active");
    appState.currentView = viewName;
  }
}

// Stats Component
function renderStats() {
  const container = document.getElementById("stats-container");
  if (!container) return;

  container.innerHTML = appState.stats
    .map(
      (stat, index) => `
        <div class="stat-card" style="animation-delay: ${index * 0.1}s">
            <div class="stat-label">${stat.label}</div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label" style="margin-top: 0.5rem; text-transform: none;">
                ${stat.description}
            </div>
        </div>
    `,
    )
    .join("");
}

// Blog Posts Component
function renderPosts(filter = "all") {
  const container = document.getElementById("posts-container");
  if (!container) return;

  const filteredPosts =
    filter === "all"
      ? appState.posts
      : appState.posts.filter((post) => post.tags.includes(filter));

  if (filteredPosts.length === 0) {
    container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--text-muted);">
                No posts found for this category.
            </div>
        `;
    return;
  }

  container.innerHTML = filteredPosts
    .map(
      (post, index) => `
        <div class="post-card" onclick="openPost(${post.id})" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both">
            <div class="post-meta">
                <span>${formatDate(post.date)}</span>
                <span class="post-tag">#${post.category}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="read-more">Read full post</div>
        </div>
    `,
    )
    .join("");
}

// Filter Tags Component
function renderFilterTags() {
  const container = document.getElementById("filter-tags");
  if (!container) return;

  const allTags = [
    "all",
    ...new Set(appState.posts.flatMap((post) => post.tags)),
  ];

  container.innerHTML = allTags
    .map(
      (tag) => `
        <button class="tag-btn ${tag === "all" ? "active" : ""}" onclick="filterPosts('${tag}')">
            ${tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
    `,
    )
    .join("");
}

function filterPosts(tag) {
  appState.currentFilter = tag;
  renderPosts(tag);

  // Update active tag button
  document.querySelectorAll(".tag-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}

// Timeline Component
function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  container.innerHTML = appState.timeline
    .map(
      (item, index) => `
        <div class="timeline-item" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both">
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-desc">${item.desc}</div>
        </div>
    `,
    )
    .join("");
}

// Utility Functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function openPost(postId) {
  // In a full implementation, this would open a modal or navigate to a full post page
  const post = appState.posts.find((p) => p.id === postId);
  if (post) {
    alert(
      `Opening post: ${post.title}\n\nIn a full implementation, this would display the complete blog post with rich content, images, and code snippets.`,
    );
    // TODO: Implement full post view
  }
}

// Initialize App
function initializeApp() {
  console.log("🚀 Progress Blog App Initialized");

  // Initialize navigation
  initializeNavigation();

  // Render all components
  renderStats();
  renderPosts();
  renderFilterTags();
  renderTimeline();

  // Add smooth scrolling for better UX
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// Export for use in console/debugging
window.appState = appState;
window.renderPosts = renderPosts;
window.filterPosts = filterPosts;
