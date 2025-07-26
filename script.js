document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const fileNameSpan = document.getElementById('fileName');
  const obfuscateBtn = document.getElementById('obfuscateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const originalCodeElement = document.getElementById('originalCode');
  const obfuscatedCodeElement = document.getElementById('obfuscatedCode');
  const customOptionsDiv = document.getElementById('customOptions');
  const customStringInput = document.getElementById('customString');
  
  const presetButtons = {
    galaxy: document.getElementById('galaxyBtn'),
    nova: document.getElementById('novaBtn'),
    strange: document.getElementById('strangeBtn'),
    custom: document.getElementById('customBtn')
  };
  
  let currentFile = null;
  let obfuscatedCode = '';
  let currentPreset = 'galaxy';

  // Initialize preset buttons
  Object.keys(presetButtons).forEach(preset => {
    presetButtons[preset].addEventListener('click', function() {
      // Remove active class from all buttons
      Object.values(presetButtons).forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      currentPreset = preset;
      
      // Show/hide custom options
      if (preset === 'custom') {
        customOptionsDiv.classList.remove('hidden');
      } else {
        customOptionsDiv.classList.add('hidden');
      }
    });
  });

  // Handle file selection
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.js')) {
        fileNameSpan.textContent = file.name;
        currentFile = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const content = e.target.result;
          originalCodeElement.textContent = content;
          obfuscatedCodeElement.textContent = 'Obfuscated code will appear here...';
          obfuscateBtn.disabled = false;
          downloadBtn.disabled = true;
        };
        
        reader.onerror = function() {
          alert('Error reading file');
          resetFileInput();
        };
        
        reader.readAsText(file);
      } else {
        alert('Please select a valid JavaScript file (.js)');
        resetFileInput();
      }
    }
  });

  function resetFileInput() {
    fileInput.value = '';
    fileNameSpan.textContent = 'Pilih File JavaScript (.js)';
    currentFile = null;
    obfuscateBtn.disabled = true;
    downloadBtn.disabled = true;
    originalCodeElement.textContent = 'No file uploaded yet...';
    obfuscatedCodeElement.textContent = 'Obfuscated code will appear here...';
  }

  // Obfuscation configurations
  const obfuscationConfigs = {
    galaxy: () => {
      const genGalaxyId = () => {
        const tag = ["gx", "orb", "gal", "astro"];
        const head = tag[Math.floor(Math.random() * tag.length)];
        const rand = Math.random().toString(36).substring(2, 6);
        return `${head}_${rand}`;
      };

      return {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.2,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        identifiersPrefix: genGalaxyId(),
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayEncoding: ['none'],
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      };
    },
    
    nova: () => {
      const generateNovaName = () => {
        const prefixes = ["nZ", "nova", "nx"];
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = Math.random().toString(36).slice(2, 8);
        return `${randomPrefix}_${suffix}`;
      };

      return {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        debugProtection: true,
        debugProtectionInterval: 200,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'mangled',
        identifiersPrefix: generateNovaName(),
        log: false,
        numbersToExpressions: true,
        renameGlobals: true,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false,
        transformObjectKeys: true
      };
    },
    
    strange: () => {
      const strangeName = () => {
        return "x" + Math.random().toString(36).slice(2, 8);
      };

      return {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.2,
        deadCodeInjection: true,
        debugProtection: true,
        debugProtectionInterval: 300,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'mangled',
        identifiersPrefix: strangeName(),
        log: false,
        numbersToExpressions: true,
        renameGlobals: true,
        selfDefending: true,
        simplify: false,
        splitStrings: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 3,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 3,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.6,
        unicodeEscapeSequence: true,
        transformObjectKeys: true
      };
    },
    
    custom: () => {
      const customString = customStringInput.value.trim() || 'custom';
      
      return {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        debugProtection: true,
        debugProtectionInterval: 400,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'mangled',
        identifiersPrefix: customString,
        log: false,
        numbersToExpressions: true,
        renameGlobals: true,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.7,
        unicodeEscapeSequence: false,
        transformObjectKeys: true
      };
    }
  };

  // Handle obfuscation
  obfuscateBtn.addEventListener('click', function() {
    if (!currentFile) {
      alert('Please upload a file first');
      return;
    }

    try {
      const originalCode = originalCodeElement.textContent;
      const options = obfuscationConfigs[currentPreset]();
      
      // Add credits to the original code
      const codeWithCredits = `/*========================================

  #- Credits By JesterNovaZ
   Contact: https://t.me/JesterNovaZ
   Youtube: https://youtube.com/@jesternovaz
    Developer : https://wa.me/601153232217
  
  -[ ! ]- Jangan hapus contact developer! hargai pembuat script ini

========================================*/\n\n${originalCode}`;
      
      obfuscatedCode = JavaScriptObfuscator.obfuscate(codeWithCredits, options).getObfuscatedCode();
      obfuscatedCodeElement.textContent = obfuscatedCode;
      downloadBtn.disabled = false;
      
      // Scroll to obfuscated code
      obfuscatedCodeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      alert('Error during obfuscation: ' + error.message);
      console.error(error);
    }
  });

  // Handle download
  downloadBtn.addEventListener('click', function() {
    if (!obfuscatedCode) {
      alert('No obfuscated code to download');
      return;
    }

    const blob = new Blob([obfuscatedCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = currentFile.name.replace('.js', `.${currentPreset}.obfuscated.js`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});