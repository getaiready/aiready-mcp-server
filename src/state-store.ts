import { UnifiedReport } from '@aiready/core';

export class StateStore {
  private lastResults: UnifiedReport | null = null;
  private lastScanTimestamp: string | null = null;

  updateLastResults(results: UnifiedReport) {
    this.lastResults = results;
    this.lastScanTimestamp = new Date().toISOString();
  }

  getLastResults(): UnifiedReport | null {
    return this.lastResults;
  }

  getSummaryMarkdown(): string {
    if (!this.lastResults) {
      return '# AIReady Summary\n\nNo scan has been run yet. Run an AIReady scan tool to see results here.';
    }

    const { score, summary } = this.lastResults;
    const grade = this.calculateGrade(score);

    return `# AIReady Summary
    
Project Score: **${score}/100 (${grade})**
Last Scan: ${this.lastScanTimestamp}

## Issue Breakdown
- Critical: ${summary.criticalIssues}
- Major: ${summary.majorIssues}
- Total Issues: ${summary.totalIssues}
- Files Analyzed: ${summary.totalFiles}

Run the \`aiready-mcp\` tool for a detailed analysis.`;
  }

  getIssuesJson(): string {
    if (!this.lastResults) {
      return JSON.stringify({
        message: 'No issues found. Please run a scan first.',
      });
    }

    // Return top 10 issues
    const topIssues = this.lastResults.issues.slice(0, 10);
    return JSON.stringify(topIssues, null, 2);
  }

  getGraphJson(): string {
    if (!this.lastResults || !this.lastResults.metadata.graph) {
      return JSON.stringify({
        message:
          'Graph data not available. Run a scan with graph analysis enabled.',
      });
    }
    return JSON.stringify(this.lastResults.metadata.graph, null, 2);
  }

  private calculateGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }
}

export const stateStore = new StateStore();
