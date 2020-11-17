const detectRyhmes = require("../src/detect-rhymes");
const fs = require("fs");
const path = require("path");

test('Detects rhymes in the man from snowy river', () => {
    let content = fs.readFileSync(path.resolve(__dirname, "the-man-from-snowy-river.txt")).toString();
    let rhymes = detectRyhmes(content);
    expect(rhymes).toMatchSnapshot();
});

test('Detects rhymes in untitled drowning poem', () => {
    let content = fs.readFileSync(path.resolve(__dirname, "untitled.txt")).toString();
    let rhymes = detectRyhmes(content);
    expect(rhymes).toMatchSnapshot();
});


test('Every end rhyme is detected in the man from snowy river', () => {
    let content = fs.readFileSync(path.resolve(__dirname, "the-man-from-snowy-river.txt")).toString();
    let endWords = content.split('\r\n').filter(l => l.match(/(\w+)/g)).map(l => l.match(/(\w+)/g).pop()); 
   
    let rhymes = detectRyhmes(content);
    
    for (let i = 0; i < endWords.length; i+=4)
    {
        let rhymeGroup1 = rhymes.find(r => r.indexOf(endWords[i]) > -1);
        expect(rhymeGroup1).not.toBeNull(); 
        expect(rhymeGroup1).toContain(endWords[i + 2]);

        let rhymeGroup2 = rhymes.find(r => r.indexOf(endWords[i + 1]) > -1);
        expect(rhymeGroup2).not.toBeNull(); 
        expect(rhymeGroup2).toContain(endWords[i + 3]);
    }
})

test("should detect long and short rhyming words", () => {
    let rhymes = detectRyhmes("overnight delight intertwine emboss mine loss shine boss refine incline");
    expect(rhymes.length).toBe(3);

    expect(rhymes[0]).toEqual(expect.arrayContaining([ 'intertwine', 'mine', 'shine', 'incline', 'refine' ]));
    expect(rhymes[0].length).toBe(5);

    expect(rhymes[1]).toEqual(expect.arrayContaining(['emboss', 'loss', 'boss' ]));
    expect(rhymes[1].length).toBe(3);

    expect(rhymes[2]).toEqual(expect.arrayContaining([ 'overnight', 'delight' ]));
    expect(rhymes[2].length).toBe(2);
});

test("should rhyme friendliness with mess", () => {
    let rhymes = detectRyhmes("friendliness mess you're for noobs I guess. and your loser with allow more pests to deploy a mess");
    expect(rhymes.length).toBe(2);
});

test('man from snowy river rhyme detection should run faster than 200ms', async () => {
    let content = fs.readFileSync(path.resolve(__dirname, "the-man-from-snowy-river.txt")).toString();

    let t0 = performance.now();

    detectRyhmes(content);

    var t1 = performance.now();

    expect(t1 - t0).toBeLessThan(200);
});