const markdown = `
## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~
`;

const html = `
<table border='1'>
  <tr align=left>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
`;

describe('Allure labels', () => {
    it('should be able to add label', () => {
        cy.allure().label('tag', 'tagLabel');
    });

    it('should be able to add test id for allure testops', () => {
        cy.allure().testID('42');
    });

    it('should be able to add owner', () => {
        cy.allure().owner('Oleksandr Shevtsov');
    });

    it('should be able to add severity', () => {
        cy.allure().severity('critical');
    });

    it('should be able to add tag', () => {
        cy.allure().tag('tag');
    });

    it('should be able to add markdown description', () => {
        cy.allure()
            .startStep('should not have description')
            .description(markdown);
    });

    it('should be able to add html description', () => {
        cy.allure()
            .startStep('should not have description')
            .descriptionHtml(html);
    });
});
