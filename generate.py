import os
import re
import json
import shutil

def get(dict, variables, key):
    if '.' in key:
        v, k = key.split('.')
        return variables[v][k]
    return dict[key]

def render(content, data, variables = {}):
    block_re = r"@for\((?P<var>\w+) in (?P<iterable>\w+.?\w*)\)\s*\{(?P<content>(.|\n)*)\}"
    match = re.search(
        block_re,
        content,
        re.MULTILINE)
    dict = match.groupdict() if match else None
    if dict:
        iterable = get(data, variables, dict["iterable"])
        if len(iterable) == 0:
            content = re.sub(block_re, "<div class='col-12 d-flex justify-content-center text-muted my-3'>Sin emails en esta carpeta.</div>", content)
        replace = ""
        for i in iterable:
            variables[dict['var']] = i
            replace += render(dict['content'], data, variables) + "\n"
        content = re.sub(block_re, replace, content)

    content = re.sub(
        r"\{\{(\w+.?\w*)\}\}",
        lambda x: get(data, variables, x.group(1)),
        content)
    
    return content

configs_dir = "./configs/"
files = [os.path.join(configs_dir, fileName) for fileName in os.listdir(configs_dir)]

for configFileName in files:
    with open(configFileName, "r") as f:
        data = json.load(f)
    
    if os.path.isdir(data["title"]):
        shutil.rmtree(data["title"], )
    shutil.copytree("template", data["title"])

    for fileName in os.listdir("template"):
        srcFile = os.path.join("template", fileName)
        if srcFile.split('.')[-1] == "html":            
            with open(srcFile, "r") as f:
                content = f.read()

            output = render(content, data) 

            with open(os.path.join(data["title"], fileName), "w+") as f:
                f.write(output) 
