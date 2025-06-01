from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="machine_automata",
    version="0.1.0",
    author="Ameyaw9",
    author_email="your.email@example.com",  # Replace with your email
    description="An intelligent automation suggestion engine with GUI interface",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Ameyaw9/machine_automata",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
    install_requires=[
        "tkinter>=8.6",
        "typing>=3.7.4",
        "datetime>=4.3",
    ],
    entry_points={
        'console_scripts': [
            'automation-machine=applications.auto_system:main',
        ],
    },
    include_package_data=True,
    package_data={
        'machine_automata': ['config/*.py', 'utils/*.py'],
    },
) 