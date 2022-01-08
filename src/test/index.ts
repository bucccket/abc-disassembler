import { AbcFile, ExtendedBuffer, InstructionDisassembler, InstructionFormatter, MultinameKind } from '..';
import { readFileSync } from 'fs';
import { SWFFile } from '../../../swf-parser';
import { stringify } from 'querystring';

const swf = SWFFile.load(readFileSync(`${process.env.STEAM_COMMON}\\Brawlhalla\\BrawlhallaAir.swf`));

function findMethodBody(abcFile: AbcFile, method: number) {
    for (const method_body of abcFile.method_body) {
        if (method_body.method == method) {
            return method_body;
        }
    }

    return false;
}

for (const tag of swf.tags) {
    if (tag.type == 72) {
        const abcFile: AbcFile = AbcFile.read(new ExtendedBuffer(tag.data)) as AbcFile;
        const disassembler = new InstructionDisassembler(abcFile);
        const instructionFormatter = new InstructionFormatter(abcFile);

        for (let i = 0; i < abcFile.instance.length; i++) {
            const instanceInfo = abcFile.instance[i];
            const multiname = abcFile.constant_pool.multiname[instanceInfo.name - 1];
            let name;
            if ([7, 22, 29].includes(multiname.kind)) {
                name = abcFile.constant_pool.string[(multiname.data as any).name - 1];
            }

            if (name == '_-E3R') {
                const methodBody = findMethodBody(abcFile, instanceInfo.iinit);
                if (!methodBody) {
                    break;
                }
                const pcode = disassembler.disassemble(methodBody);
                //console.log(pcode);
            }
        }
    }
}