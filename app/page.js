"use client"
import React, { useState } from 'react';
import { Upload, Download, Plus, X, Zap } from 'lucide-react';

export default function GEOTool() {
  const [content, setContent] = useState('');
  const [targetEngine, setTargetEngine] = useState('openai');
  const [optimizations, setOptimizations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const engines = [
    { id: 'openai', name: 'ChatGPT', color: 'bg-green-500' },
    { id: 'google', name: 'Google AI Overview', color: 'bg-blue-500' },
    { id: 'claude', name: 'Claude', color: 'bg-purple-500' },
    { id: 'perplexity', name: 'Perplexity', color: 'bg-orange-500' },
    { id: 'gemini', name: 'Gemini', color: 'bg-red-500' }
  ];

  const analyzeContent = () => {
    if (!content.trim()) {
      alert('Please enter content to analyze');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newOptimizations = generateOptimizations(content, targetEngine);
      setOptimizations(newOptimizations);
      setRecommendations(generateRecommendations(content, targetEngine));
      setLoading(false);
    }, 1500);
  };

  const generateOptimizations = (text, engine) => {
    const baseOpts = [
      {
        type: 'Clarity Score',
        current: calculateClarity(text),
        suggestion: 'Use shorter sentences and clearer language for AI comprehension'
      },
      {
        type: 'Keyword Density',
        current: calculateKeywordDensity(text),
        suggestion: 'Optimize primary keywords for better AI extraction'
      },
      {
        type: 'Structure Optimization',
        current: calculateStructure(text),
        suggestion: 'Use headers and bullet points for AI parsing'
      },
      {
        type: 'Entity Recognition',
        current: calculateEntities(text),
        suggestion: 'Include specific, named entities AI can recognize'
      }
    ];

    if (engine === 'google') {
      baseOpts.push({
        type: 'SERP Relevance',
        current: Math.floor(Math.random() * 40 + 40),
        suggestion: 'Align with common Google AI Overview formats'
      });
    } else if (engine === 'openai') {
      baseOpts.push({
        type: 'Token Efficiency',
        current: Math.floor(Math.random() * 30 + 50),
        suggestion: 'Optimize for ChatGPT token usage patterns'
      });
    }

    return baseOpts;
  };

  const generateRecommendations = (text, engine) => {
    return [
      'Add a clear, concise summary in the first 100 words',
      'Include specific statistics and data points with sources',
      'Structure content with H2 and H3 headers for AI extraction',
      'Use natural language questions as section headers',
      'Include a FAQ or Q&A section for featured snippet optimization',
      'Add schema markup (structured data) for better understanding',
      'Include direct answers to common queries in your niche',
      'Optimize for long-form content (2000+ words) for AI models'
    ];
  };

  const calculateClarity = (text) => {
    const avgWordLength = text.split(' ').reduce((sum, word) => sum + word.length, 0) / text.split(' ').length;
    const avgSentenceLength = text.split('.').length;
    return Math.max(20, Math.min(100, 100 - ((avgWordLength - 4) * 5 + (avgSentenceLength - 10) * 2)));
  };

  const calculateKeywordDensity = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words).size;
    return Math.floor((uniqueWords / words.length) * 100);
  };

  const calculateStructure = (text) => {
    const headers = (text.match(/^#+/gm) || []).length;
    const lists = (text.match(/^[-*•]/gm) || []).length;
    const paragraphs = text.split('\n\n').length;
    return Math.min(100, (headers * 20 + lists * 15 + Math.min(paragraphs * 5, 50)));
  };

  const calculateEntities = (text) => {
    const capitalized = (text.match(/\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/g) || []).length;
    return Math.floor(Math.min(100, capitalized * 3));
  };

  const downloadReport = () => {
    const report = `GEO Analysis Report
Generated for: ${targetEngine}

OPTIMIZATION SCORES:
${optimizations.map(opt => `${opt.type}: ${opt.current}%`).join('\n')}

RECOMMENDATIONS:
${recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

Content analyzed at: ${new Date().toLocaleString()}`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GEO_Report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="text-yellow-400" size={32} />
            <h1 className="text-4xl font-bold text-white">GEO Optimizer</h1>
          </div>
          <p className="text-purple-200 text-lg">Optimize your content for Generative Search Engines</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-6">
              <label className="block text-white font-semibold mb-3">Your Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 bg-slate-700/50 border border-purple-400/30 rounded text-white placeholder-gray-400 p-4 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30"
                placeholder="Paste your article, blog post, or content here..."
              />
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-6">
              <label className="block text-white font-semibold mb-4">Target AI Engine</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {engines.map(engine => (
                  <button
                    key={engine.id}
                    onClick={() => setTargetEngine(engine.id)}
                    className={`p-3 rounded-lg font-medium transition-all ${
                      targetEngine === engine.id
                        ? `${engine.color} text-white shadow-lg scale-105`
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {engine.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={analyzeContent}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
            >
              {loading ? 'Analyzing...' : 'Analyze Content'}
            </button>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {optimizations.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-6 sticky top-8">
                <h2 className="text-white font-bold text-lg mb-4">Optimization Scores</h2>
                <div className="space-y-4">
                  {optimizations.map((opt, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{opt.type}</span>
                        <span className="text-sm font-bold text-purple-400">{opt.current}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                          style={{ width: `${opt.current}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={downloadReport}
                  className="w-full mt-6 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Download size={18} /> Download Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-8 bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-white font-bold text-xl mb-4">Optimization Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-slate-700/30 border border-purple-400/20 rounded p-4">
                  <p className="text-gray-200 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
