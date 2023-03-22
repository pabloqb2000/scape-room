import os
import re
import json
import shutil
import hashlib

def sha256(msg):
    return hashlib.sha256(msg.encode('utf-8')).hexdigest()
def cut(txt):
    if '<br>' in txt:
        return txt.split('<')[0] + "..."
    elif len(txt) > 32:
        return txt[:32] + "..."
    return txt

def get(dict, variables, key):
    if '.' in key:
        v, k = key.split('.')
        if k[-3:] == "_sm":
            return cut(variables[v][k[:-3]])
        return variables[v][k]
    if key == "password":
        return sha256(dict[key].lower() + dict["salt_1"])
    elif key == "title":
        return dict[key].capitalize()
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
        if not os.path.isdir(srcFile) and not fileName.split('.')[-1].lower() in ["png", "jpg", "jpeg"]:            
            with open(srcFile, "r") as f:
                content = f.read()

            output = render(content, data) 

            if fileName == "mail_inbox.html":
                fileName = "mail_" + data["mail_token"] + ".html"
                
            with open(os.path.join(data["title"], fileName), "w+") as f:
                f.write(output) 

    os.remove(os.path.join(data["title"], "mail_inbox.html"))
    os.remove(os.path.join(data["title"], "imgs/cover_img.png"))
    shutil.copyfile(
        os.path.join("mail-imgs", data["cover_img_name"]), 
        os.path.join(data["title"], "imgs/"+data["cover_img_name"]))