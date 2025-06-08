import subprocess
import sys
import os

remote_user = 'root'
remote_server_ip = ''

root_path = '/Users/zyaztec/Projects/zerolovesea.top'
remote_path = '/home/ecs-assist-user/zerolovesea.top'
pem_path = '/Users/zyaztec/Documents/重要文件/root-key.pem'


# build project
print("Running pnpm build ...")
build = subprocess.run(["pnpm", "build"], cwd=root_path)
if build.returncode != 0:
    print("pnpm build failed")
    sys.exit(1)

# compress dist directory
dist_path = os.path.join(root_path, "dist")
tar_path = os.path.join(root_path, "dist.tar.gz")
print("Packing dist directory ...")
if not os.path.exists(dist_path):
    print("dist directory does not exist")
    sys.exit(1)
tar = subprocess.run(["tar", "czf", tar_path, "dist"], cwd=root_path)
if tar.returncode != 0:
    print("Packing dist failed")
    sys.exit(1)

# upload to remote server
print("Uploading dist.tar.gz to server ...")
scp = subprocess.run([
    "scp",
    "-i", pem_path,
    tar_path,
    f"{remote_user}@{remote_server_ip}:{remote_path}/"
])
if scp.returncode != 0:
    print("Upload failed")
    sys.exit(1)

# delete local tar.gz file
print("Removing old dist and extracting new one on server ...")
ssh_cmd = (
    f"cd {remote_path} && "
    "rm -rf dist && "
    "tar -xzf dist.tar.gz && "
    "rm dist.tar.gz"
)
ssh = subprocess.run([
    "ssh",
    "-i", pem_path,
    f"{remote_user}@{remote_server_ip}",
    ssh_cmd
])
if ssh.returncode != 0:
    print("Remote clean and extract failed")
    sys.exit(1)

print("Deploy and upload finished successfully.")
