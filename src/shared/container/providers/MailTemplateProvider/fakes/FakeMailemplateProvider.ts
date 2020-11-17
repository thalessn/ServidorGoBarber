import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMaiTemplateDTO from '../dtos/IParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template }: IParseMaiTemplateDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateProvider;
