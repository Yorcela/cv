import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    let result = value;
    

    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    

    result = result.replace(/- \*\*(.*?)\*\*\s*:/g, '<li><strong>$1:</strong>');
    

    result = result.replace(/^- (.+)$/gm, '<li>$1</li>');
    

    result = result.replace(/((<li>.*?<\/li>\s*)+)/g, '<ul>$1</ul>');
    

    result = result.replace(/<\/ul>\s*<ul>/g, '');
    
    return result;
  }
}