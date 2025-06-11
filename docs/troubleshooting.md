# Troubleshooting Guide
**Common Issues and Solutions**

## 🔧 Quick Diagnostics

### Health Check Commands
```bash
# Run the complete health check
./health-check.sh

# Check individual services
docker-compose ps
curl http://localhost:7474  # Neo4j
curl http://localhost:11434/api/tags  # Ollama
node -v && npm -v  # Node.js
```

### Log Analysis
```bash
# View real-time logs
docker-compose logs -f

# Check specific service logs
docker-compose logs neo4j
docker-compose logs ollama

# Application logs
tail -f logs/application.log
tail -f logs/error.log
```

---

## 🚨 Common Issues by Workshop

### Workshop 1: Project Planning Systems

#### Issue: DeepInvent.ai API Connection Failed
**Symptoms:**
- `Error: DeepInvent API key invalid`
- `Connection timeout to DeepInvent.ai`

**Solutions:**
```bash
# 1. Verify API key
echo $DEEPINVENT_API_KEY

# 2. Test API connectivity
curl -H "Authorization: Bearer $DEEPINVENT_API_KEY" \
     https://api.deepinvent.ai/health

# 3. Check environment file
grep DEEPINVENT .env

# 4. Regenerate API key if needed
# Visit https://deepinvent.ai/dashboard/api-keys
```

#### Issue: GitHub Integration Problems
**Symptoms:**
- `Permission denied (publickey)`
- `Repository not found`

**Solutions:**
```bash
# 1. Check SSH key setup
ssh -T git@github.com

# 2. Use HTTPS instead of SSH
git remote set-url origin https://github.com/username/repo.git

# 3. Verify GitHub token
gh auth status

# 4. Re-authenticate if needed
gh auth login
```

### Workshop 2: Knowledge Graph Implementation

#### Issue: Neo4j Connection Failed
**Symptoms:**
- `Failed to connect to Neo4j`
- `Database unavailable`
- `Authentication failed`

**Solutions:**
```bash
# 1. Check if Neo4j is running
docker ps | grep neo4j

# 2. Restart Neo4j container
docker-compose restart neo4j

# 3. Check Neo4j logs
docker-compose logs neo4j

# 4. Verify credentials
echo "Username: neo4j"
echo "Password: password123"

# 5. Test connection
curl -u neo4j:password123 http://localhost:7474/db/data/

# 6. Reset Neo4j data if corrupted
docker-compose down
docker volume rm $(docker volume ls -q | grep neo4j)
docker-compose up -d neo4j
```

#### Issue: Penumbra.ai Integration Problems
**Symptoms:**
- `Penumbra API rate limit exceeded`
- `Invalid Penumbra API key`

**Solutions:**
```bash
# 1. Check API key
echo $PENUMBRA_API_KEY

# 2. Test API access
curl -H "Authorization: Bearer $PENUMBRA_API_KEY" \
     https://api.getpenumbra.ai/health

# 3. Implement rate limiting
# Add delays between API calls
sleep 1

# 4. Check account status
# Visit https://www.getpenumbra.ai/dashboard
```

### Workshop 3: Marketing AI Services

#### Issue: Sindarin.tech Voice AI Not Working
**Symptoms:**
- `Microphone permission denied`
- `Audio processing failed`
- `Voice synthesis error`

**Solutions:**
```bash
# 1. Check browser permissions
# Enable microphone access in browser settings

# 2. Test audio devices
# macOS
system_profiler SPAudioDataType

# Linux
arecord -l
pactl list sources

# 3. Install audio dependencies
# Ubuntu
sudo apt install pulseaudio alsa-utils

# macOS
brew install portaudio

# 4. Test Sindarin API
curl -H "Authorization: Bearer $SINDARIN_API_KEY" \
     https://api.sindarin.tech/health
```

#### Issue: Voice Audio Quality Problems
**Symptoms:**
- Static or noise in audio
- Poor voice recognition
- Choppy audio playback

**Solutions:**
```bash
# 1. Check audio sample rate
# Ensure 44.1kHz or 48kHz

# 2. Test microphone quality
# Record test audio
arecord -f cd test.wav

# 3. Adjust audio settings
# Reduce background noise
# Use headphones to prevent feedback

# 4. Update audio drivers
# Check manufacturer website for updates
```

### Workshop 4: AI Video Generation

#### Issue: Texel.ai Video Generation Failed
**Symptoms:**
- `Video generation timeout`
- `Insufficient credits`
- `Invalid video parameters`

**Solutions:**
```bash
# 1. Check API key and credits
curl -H "Authorization: Bearer $TEXEL_API_KEY" \
     https://api.texel.ai/account/credits

# 2. Verify video parameters
# Duration: max 300 seconds
# Resolution: 1080p, 720p, 480p
# Format: mp4, webm

# 3. Check disk space
df -h

# 4. Monitor video generation status
curl -H "Authorization: Bearer $TEXEL_API_KEY" \
     https://api.texel.ai/videos/{video_id}/status
```

#### Issue: FFmpeg Not Found
**Symptoms:**
- `FFmpeg command not found`
- `Video processing failed`

**Solutions:**
```bash
# Install FFmpeg
# macOS
brew install ffmpeg

# Ubuntu
sudo apt update
sudo apt install ffmpeg

# CentOS/RHEL
sudo yum install epel-release
sudo yum install ffmpeg

# Verify installation
ffmpeg -version
```

### Workshop 5: Tool Calling & MCP Integration

#### Issue: MCP Server Won't Start
**Symptoms:**
- `Port 8001 already in use`
- `MCP server crashed`
- `Tool registration failed`

**Solutions:**
```bash
# 1. Check port availability
lsof -i :8001

# 2. Kill conflicting process
sudo kill -9 $(lsof -ti:8001)

# 3. Check MCP server logs
tail -f logs/mcp-server.log

# 4. Restart MCP server
npm run mcp:restart

# 5. Verify tool registration
curl http://localhost:8001/tools
```

#### Issue: Toolhouse.ai Integration Problems
**Symptoms:**
- `Tool execution timeout`
- `Invalid tool parameters`
- `Toolhouse API rate limit`

**Solutions:**
```bash
# 1. Test Toolhouse connectivity
curl -H "Authorization: Bearer $TOOLHOUSE_API_KEY" \
     https://api.toolhouse.ai/health

# 2. Check tool parameters
# Validate JSON structure
jq . tool-parameters.json

# 3. Implement retry logic
# Add exponential backoff

# 4. Monitor API usage
curl -H "Authorization: Bearer $TOOLHOUSE_API_KEY" \
     https://api.toolhouse.ai/usage
```

### Workshop 6: Local AI Deployment

#### Issue: Ollama Installation Failed
**Symptoms:**
- `Ollama command not found`
- `Model download failed`
- `CUDA not available`

**Solutions:**
```bash
# 1. Reinstall Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Check installation
which ollama
ollama --version

# 3. Start Ollama service
ollama serve &

# 4. Check CUDA support (for GPU)
nvidia-smi
cuda-smi

# 5. Pull models manually
ollama pull llama3.2:latest
ollama list
```

#### Issue: Insufficient Memory for AI Models
**Symptoms:**
- `Out of memory error`
- `Model loading failed`
- `Slow AI responses`

**Solutions:**
```bash
# 1. Check available memory
free -h

# 2. Use smaller models
ollama pull llama3.2:7b  # Instead of 13b or 70b

# 3. Adjust Docker memory limits
docker update --memory="8g" ollama-ai

# 4. Close unnecessary applications
# Free up system memory

# 5. Use quantized models
ollama pull llama3.2:7b-q4_0  # 4-bit quantization
```

---

## 🐳 Docker-Specific Issues

### Docker Container Problems

#### Issue: Container Won't Start
```bash
# 1. Check Docker status
sudo systemctl status docker

# 2. Restart Docker service
sudo systemctl restart docker

# 3. Check container logs
docker-compose logs [service_name]

# 4. Remove and recreate containers
docker-compose down
docker-compose up -d
```

#### Issue: Port Conflicts
```bash
# 1. Find conflicting processes
sudo lsof -i :7474  # Neo4j
sudo lsof -i :8000  # API
sudo lsof -i :11434 # Ollama

# 2. Kill conflicting processes
sudo kill -9 [PID]

# 3. Change ports in docker-compose.yml
# Edit port mappings if needed
```

#### Issue: Volume Mount Problems
```bash
# 1. Check volume permissions
ls -la /var/lib/docker/volumes/

# 2. Fix permissions
sudo chown -R $USER:$USER ./storage
sudo chmod -R 755 ./storage

# 3. Reset volumes
docker-compose down -v
docker-compose up -d
```

---

## 🌐 Network and API Issues

### API Connectivity Problems

#### Issue: SSL Certificate Errors
```bash
# 1. Update certificates
# Ubuntu
sudo apt update && sudo apt install ca-certificates

# macOS
brew install ca-certificates

# 2. Check system time
date
# Ensure system time is accurate
```

#### Issue: Firewall Blocking Connections
```bash
# 1. Check firewall status
# Ubuntu
sudo ufw status

# 2. Open required ports
sudo ufw allow 7474  # Neo4j Browser
sudo ufw allow 7687  # Neo4j Bolt
sudo ufw allow 8000  # API
sudo ufw allow 11434 # Ollama

# 3. Restart firewall
sudo ufw reload
```

### Rate Limiting Issues

#### Issue: API Rate Limits Exceeded
**Solutions:**
```javascript
// Implement exponential backoff
async function callAPIWithRetry(apiCall, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.status === 429) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

## 🔍 Performance Issues

### Slow Response Times

#### Issue: AI Models Running Slowly
**Solutions:**
```bash
# 1. Check system resources
top
htop
iotop

# 2. Use GPU acceleration
# Ensure CUDA is installed and configured
nvidia-smi

# 3. Optimize model parameters
# Reduce context length
# Use smaller models
# Enable model quantization

# 4. Increase Docker resources
docker update --cpus="4" --memory="8g" ollama-ai
```

#### Issue: Database Query Performance
**Solutions:**
```cypher
// Create indexes for frequently queried properties
CREATE INDEX person_id FOR (p:Person) ON (p.id);
CREATE INDEX conversation_timestamp FOR (c:Conversation) ON (c.timestamp);

// Optimize queries
// Use LIMIT to reduce result sets
MATCH (p:Person)
WHERE p.name CONTAINS 'John'
RETURN p
LIMIT 10;
```

---

## 🔐 Security Issues

### API Key Security

#### Issue: API Keys Exposed
**Solutions:**
```bash
# 1. Rotate all exposed API keys immediately
# Visit each platform's dashboard to generate new keys

# 2. Remove from version control
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all

# 3. Add to .gitignore
echo ".env" >> .gitignore
echo "*.key" >> .gitignore

# 4. Use environment variables properly
# Never hardcode API keys in source code
```

### Permission Issues

#### Issue: File Permission Errors
```bash
# 1. Fix file permissions
sudo chown -R $USER:$USER .
chmod -R 755 .

# 2. Fix Docker permissions
sudo usermod -aG docker $USER
# Logout and login again

# 3. SELinux issues (CentOS/RHEL)
sudo setsebool -P httpd_can_network_connect 1
```

---

## 🆘 Emergency Recovery

### Complete System Reset

```bash
#!/bin/bash
# emergency-reset.sh

echo "🆘 Performing emergency system reset..."

# Stop all services
docker-compose down -v

# Remove all containers and volumes
docker system prune -af
docker volume prune -f

# Reset local changes
git stash
git reset --hard origin/main

# Reinstall dependencies
npm install

# Recreate environment file
cp .env.example .env
echo "⚠️  Remember to update .env with your API keys"

# Restart services
docker-compose up -d

echo "✅ Emergency reset complete"
```

### Backup and Restore

```bash
# Create backup
./scripts/backup.sh

# Restore from backup
./scripts/restore.sh backup-YYYY-MM-DD.tar.gz
```

---

## 📞 Getting Help

### Before Asking for Help

1. **Check the logs**: `docker-compose logs`
2. **Run health check**: `./health-check.sh`
3. **Search existing issues**: GitHub Issues
4. **Try the solutions above**: Most problems have known fixes

### How to Report Issues

```bash
# Generate debug information
./scripts/debug-info.sh > debug.txt
```

Include in your issue report:
- Operating system and version
- Node.js and Docker versions
- Workshop number and step
- Complete error messages
- Output from debug-info.sh

### Community Support

- **GitHub Issues**: Technical problems and bugs
- **Discord Channel**: Real-time help and discussion
- **Workshop Forums**: Workshop-specific questions
- **Office Hours**: Live support during hackathon

---

**Most issues can be resolved quickly with these solutions. If you're still stuck, don't hesitate to ask for help!** 🤝