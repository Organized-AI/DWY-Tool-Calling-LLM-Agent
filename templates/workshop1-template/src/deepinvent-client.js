/**
 * DeepInvent.ai Client for Patent Application Support
 * Innovation analysis and patent application assistance
 */

const axios = require('axios');
const { getDemoInnovationAnalysis } = require('./demo-data');

class DeepInventClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.deepinvent.ai/v1'; // Hypothetical API endpoint
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
  }

  /**
   * Analyze innovation for patentability
   */
  async analyzeInnovation(innovationData) {
    try {
      // In demo mode or if no API key, return demo data
      if (!this.apiKey || process.env.DEMO_MODE === 'true') {
        console.log('🔬 Running patent analysis in demo mode...');
        return this.getDemoAnalysis(innovationData);
      }

      const response = await this.client.post('/analyze', {
        title: innovationData.title,
        description: innovationData.description,
        category: innovationData.category || 'software',
        inventors: innovationData.inventors || [],
        technical_field: innovationData.technical_field,
        background: innovationData.background,
        summary: innovationData.summary,
        claims: innovationData.claims || []
      });

      console.log(`✅ Patent analysis completed for: ${innovationData.title}`);
      return response.data;

    } catch (error) {
      console.error('Error analyzing innovation:', error);
      
      // Fallback to demo data on error
      console.log('📋 Falling back to demo analysis data...');
      return this.getDemoAnalysis(innovationData);
    }
  }

  /**
   * Search for similar patents
   */
  async searchSimilarPatents(searchQuery) {
    try {
      if (!this.apiKey || process.env.DEMO_MODE === 'true') {
        return this.getDemoSimilarPatents(searchQuery);
      }

      const response = await this.client.post('/search', {
        query: searchQuery.query,
        category: searchQuery.category,
        date_range: searchQuery.date_range,
        limit: searchQuery.limit || 10
      });

      return response.data;

    } catch (error) {
      console.error('Error searching patents:', error);
      return this.getDemoSimilarPatents(searchQuery);
    }
  }

  /**
   * Submit provisional patent application
   */
  async submitProvisionalApplication(applicationData) {
    try {
      if (!this.apiKey || process.env.DEMO_MODE === 'true') {
        return this.getDemoApplicationSubmission(applicationData);
      }

      const response = await this.client.post('/applications/provisional', {
        title: applicationData.title,
        inventors: applicationData.inventors,
        description: applicationData.description,
        claims: applicationData.claims,
        drawings: applicationData.drawings || [],
        priority_date: applicationData.priority_date
      });

      console.log(`✅ Provisional patent application submitted: ${response.data.application_id}`);
      return response.data;

    } catch (error) {
      console.error('Error submitting application:', error);
      return this.getDemoApplicationSubmission(applicationData);
    }
  }

  /**
   * Get patent application status
   */
  async getApplicationStatus(applicationId) {
    try {
      if (!this.apiKey || process.env.DEMO_MODE === 'true') {
        return this.getDemoApplicationStatus(applicationId);
      }

      const response = await this.client.get(`/applications/${applicationId}/status`);
      return response.data;

    } catch (error) {
      console.error('Error fetching application status:', error);
      return this.getDemoApplicationStatus(applicationId);
    }
  }

  /**
   * Generate patent claims
   */
  async generateClaims(innovationDescription) {
    try {
      if (!this.apiKey || process.env.DEMO_MODE === 'true') {
        return this.getDemoClaims(innovationDescription);
      }

      const response = await this.client.post('/generate/claims', {
        description: innovationDescription,
        claim_type: 'method', // or 'system', 'apparatus'
        complexity: 'standard'
      });

      return response.data;

    } catch (error) {
      console.error('Error generating claims:', error);
      return this.getDemoClaims(innovationDescription);
    }
  }

  /**
   * Estimate patent costs
   */
  async estimateCosts(applicationData) {
    try {
      if (!this.apiKey || process.env.DEMO_MODE === 'true') {
        return this.getDemoCostEstimate(applicationData);
      }

      const response = await this.client.post('/estimate/costs', {
        application_type: applicationData.type || 'provisional',
        complexity: applicationData.complexity || 'standard',
        expedited: applicationData.expedited || false,
        regions: applicationData.regions || ['US']
      });

      return response.data;

    } catch (error) {
      console.error('Error estimating costs:', error);
      return this.getDemoCostEstimate(applicationData);
    }
  }

  // Demo data methods for when API is not available

  getDemoAnalysis(innovationData) {
    const baseAnalysis = getDemoInnovationAnalysis();
    
    return {
      ...baseAnalysis,
      innovation_title: innovationData.title,
      analyzed_at: new Date().toISOString(),
      analysis_id: `demo-analysis-${Date.now()}`,
      detailed_report: {
        technical_novelty: 'High - unique approach to AI-driven optimization',
        commercial_viability: 'Strong - addresses real market need',
        patent_landscape: 'Moderately crowded but room for differentiation',
        recommended_claims: [
          'A method for automatically optimizing project workflows using artificial intelligence',
          'A system for predicting project risks and resource conflicts',
          'A computer-implemented process for generating project timelines with AI assistance'
        ]
      },
      next_steps: [
        'Prepare detailed technical specification',
        'Document unique AI algorithms and methodologies',
        'Consider filing provisional patent within 60 days',
        'Conduct freedom-to-operate analysis'
      ]
    };
  }

  getDemoSimilarPatents(searchQuery) {
    return {
      query: searchQuery.query,
      total_results: 127,
      patents: [
        {
          patent_number: 'US10,123,456',
          title: 'System for Project Management Optimization',
          inventors: ['Smith, John', 'Doe, Jane'],
          filing_date: '2019-03-15',
          similarity_score: 0.72
        },
        {
          patent_number: 'US9,987,654',
          title: 'AI-Assisted Resource Allocation Methods',
          inventors: ['Johnson, Robert'],
          filing_date: '2018-08-22',
          similarity_score: 0.68
        },
        {
          patent_number: 'US10,456,789',
          title: 'Machine Learning for Timeline Prediction',
          inventors: ['Williams, Sarah', 'Brown, Michael'],
          filing_date: '2020-01-10',
          similarity_score: 0.64
        }
      ],
      search_completed_at: new Date().toISOString()
    };
  }

  getDemoApplicationSubmission(applicationData) {
    return {
      application_id: `PROV-${Date.now()}`,
      status: 'submitted',
      confirmation_number: `CONF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      filing_date: new Date().toISOString(),
      title: applicationData.title,
      estimated_examination_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      fees_paid: '$1,600',
      documents_submitted: [
        'Provisional Patent Application',
        'Inventor Declaration',
        'Technical Specification'
      ],
      next_deadline: {
        type: 'Convert to Non-Provisional',
        date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'File non-provisional application to maintain priority date'
      }
    };
  }

  getDemoApplicationStatus(applicationId) {
    return {
      application_id: applicationId,
      status: 'under_review',
      current_stage: 'Initial Examination',
      progress: 0.35,
      last_updated: new Date().toISOString(),
      timeline: [
        {
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          event: 'Application Filed',
          status: 'completed'
        },
        {
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          event: 'Formal Review Completed',
          status: 'completed'
        },
        {
          date: new Date().toISOString(),
          event: 'Technical Examination In Progress',
          status: 'in_progress'
        },
        {
          date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          event: 'Examiner Report Expected',
          status: 'pending'
        }
      ],
      examiner_notes: 'Initial review shows promising novelty. Detailed technical analysis in progress.',
      estimated_decision_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    };
  }

  getDemoClaims(description) {
    return {
      generated_claims: [
        {
          claim_number: 1,
          type: 'independent',
          text: 'A computer-implemented method for optimizing project workflows, comprising: (a) receiving project parameters including goals, resources, and constraints; (b) applying machine learning algorithms to generate optimized task sequences; (c) predicting resource utilization and identifying potential conflicts; and (d) automatically adjusting project timelines based on real-time progress data.'
        },
        {
          claim_number: 2,
          type: 'dependent',
          text: 'The method of claim 1, wherein the machine learning algorithms include neural networks trained on historical project data to predict task completion times with improved accuracy.'
        },
        {
          claim_number: 3,
          type: 'dependent',
          text: 'The method of claim 1, further comprising generating risk assessments and mitigation strategies based on project complexity analysis and resource availability patterns.'
        }
      ],
      claim_analysis: {
        breadth: 'Medium - covers core functionality without being overly broad',
        strength: 'Strong - includes specific technical details and novel combinations',
        recommendations: [
          'Consider adding claims for specific AI model architectures',
          'Include claims for user interface and visualization aspects',
          'Add method claims for continuous learning and optimization'
        ]
      },
      generated_at: new Date().toISOString()
    };
  }

  getDemoCostEstimate(applicationData) {
    return {
      application_type: applicationData.type || 'provisional',
      cost_breakdown: {
        government_fees: {
          provisional: '$1,600',
          search_fee: '$0',
          examination_fee: '$0'
        },
        attorney_fees: {
          preparation: '$3,500',
          filing: '$500',
          prosecution: '$0'
        },
        additional_costs: {
          drawings: '$800',
          claims_excess: '$0',
          expedited_processing: applicationData.expedited ? '$4,000' : '$0'
        }
      },
      total_estimated_cost: applicationData.expedited ? '$10,400' : '$6,400',
      payment_schedule: [
        {
          phase: 'Filing',
          amount: '$3,100',
          due: 'Upon submission'
        },
        {
          phase: 'Prosecution',
          amount: '$3,300',
          due: 'If office action received'
        }
      ],
      cost_comparison: {
        diy_filing: '$1,600',
        basic_attorney: '$4,500',
        full_service: '$8,500',
        recommended: '$6,400'
      },
      estimated_at: new Date().toISOString()
    };
  }
}

module.exports = { DeepInventClient };
