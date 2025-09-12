import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    let result = value;
    
    // Convert **text** to <strong>text</strong>
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert lines starting with "- **text**:" to proper list items
    result = result.replace(/- \*\*(.*?)\*\*\s*:/g, '<li><strong>$1:</strong>');
    
    // Convert simple lines starting with "- " to list items
    result = result.replace(/^- (.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in <ul> tags
    result = result.replace(/((<li>.*?<\/li>\s*)+)/g, '<ul>$1</ul>');
    
    // Clean up any double <ul> tags that might have been created
    result = result.replace(/<\/ul>\s*<ul>/g, '');
    
    return result;
  }
}